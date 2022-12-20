import nodemailer from 'nodemailer';

const sendMailForNewReply = async (
  receiverMail: string,
  receiverName: string,
  senderName: string,
  comment: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: `"millie.service Team" <${process.env.NODEMAILER_USER}>`,
    to: `${receiverMail}`,
    subject: '[FastFive] 새로운 덧글이 등록되었습니다. ',
    html: `
    <p style="text-align: center;"><span style="font-size: 36px;"><strong>FastFive</strong></span></p>
    <hr />
    <blockquote>
    <p style="text-align: center;">새로운 덧글 등록 안내메일.</p>
    </blockquote>
    <p style="text-align: left;"><span style="font-size: 20px;"><span style="font-family: -apple-system, BlinkMacSystemFont, Malgun Gothic, 맑은 고딕, helvetica, Apple SD Gothic Neo, helvetica, 나눔바른고딕 옛한글, NanumBarunGothic YetHangul, sans-serif;"><span style="font-size: 13px;">안녕하세요, ${receiverName}님</span></span></span></p>
    <p style="text-align: left;"><span style="font-size: 20px;">${senderName}님께서 새로운 덧글을 남겼어요!!</span></p>
    <p><span style="font-size: 36px; background-color: #d1d5d8;">${comment}</span></p>
    <hr />
    <p><span style="font-size: 10px;">본 메일은 발신전용이며, 문의에 대한 회신은 처리되지 않습니다. </span></p>
    `,
  });
};

export { sendMailForNewReply };
