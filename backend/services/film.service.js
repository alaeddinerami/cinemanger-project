const Film = require('../models/Film.model');
const minioClient = require('../config/MinIo');
const fs = require('fs');
const path = require('path');

class FilmService {
    async uploadToMinio(filePath, fileName, bucket) {
        const bucketName = 'cinemanager';
        
        const fullFileName = `${bucket}/${fileName}`;

        const exists = await minioClient.bucketExists(bucketName);
        if (!exists) {
            await minioClient.makeBucket(bucketName, 'us-east-1');
        }

        await minioClient.fPutObject(bucketName, fullFileName, filePath);
        return `${bucketName}/${fullFileName}`;
        // return `http://127.0.0.1:9000/${bucketName}/${fullFileName}`;
    }

    async createFilm(data, files) {
        try {
            // console.log(files); 

            const imageFile = files.image[0];
            const videoFile = files.video[0];

            const image = await this.uploadToMinio(imageFile.path, imageFile.originalname, 'images');
            
            console.log(image);
            const video = await this.uploadToMinio(videoFile.path, videoFile.originalname, 'films');
            

            const filmData = {
                ...data,
                image: image, 
                video: video, 
            };

            const film = new Film(filmData);
            return await film.save();
        } catch (error) {
            throw new Error(`Error creating film: ${error.message}`);
        }
    }

    async getFilmById(id) {
        try {
            return await Film.findById(id).populate('ratings');
        } catch (error) {
            throw new Error(`Film not found: ${error.message}`);
        }
    }

    async getAllFilms() {
        try {
            return await Film.find();
        } catch (error) {
            throw new Error(`Error fetching films: ${error.message}`);
        }
    }


    async updateFilm(id, data, files) {
        try {
            const film = await Film.findById(id);
            if (!film) throw new Error('Film not found');


            Object.assign(film, data);

            if (files.image) {
                const imageFile = files.image[0];
                const imageUrl = await this.uploadToMinio(imageFile.path, imageFile.originalname, 'films');
                film.image = imageUrl; 
            }

            if (files.video) {
                const videoFile = files.video[0];
                const videoUrl = await this.uploadToMinio(videoFile.path, videoFile.originalname, 'films');
                film.video = videoUrl; 
            }

            return await film.save();
        } catch (error) {
            throw new Error(`Error updating film: ${error.message}`);
        }
    }

    
    async deleteFilm(id) {
        try {
            const film = await Film.findById(id);
            if (!film) throw new Error('Film not found');

          
            minioClient.removeObject('films', path.basename(film.image), (err) => {
                if (err) console.log('Error deleting image:', err);
            });
            minioClient.removeObject('films', path.basename(film.video), (err) => {
                if (err) console.log('Error deleting video:', err);
            });

   
            return await Film.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting film: ${error.message}`);
        }
    }
}

module.exports = new FilmService();
