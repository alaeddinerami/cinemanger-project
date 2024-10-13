const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohmmedlaeh81@gmail.com',
    pass: 'mqxkdudkoocsoyqi',
  },
});

exports.sendTiketMail = async (user, reservation, seance, salle, film) => {
  await transporter.sendMail({
    to: user.email,
    subject: 'Session Ticket Confirmation',
    html: `
      <p>Hello ${user.name},</p>
      <p>Your reservation has been confirmed!</p>
      <ul>
        <li><strong>Movie:</strong> ${film.title}</li>
        <li><strong>Session Date and Time:</strong> ${seance.date}</li>
        <li><strong>Room:</strong> ${salle.name}</li>
        <li><strong>Seats:</strong> ${reservation.seats}</li>
        <li><strong>Price:</strong> ${seance.price} MAD</li>
      </ul>
      <p>Thank you for choosing our service! Enjoy your movie!</p>
    `,
  });
};
