"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("../configs/env.config"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: env_config_1.default.AppServiceEmail,
        pass: env_config_1.default.AppServiceEmailPassword,
    },
});
const htmlTemplate = (html) => `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Profile Display</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Lato&family=Sacramento&display=swap" rel="stylesheet">
      <style>
          * {
              padding: 0%;
              margin: 0%;
              box-sizing: border-box;
              font-family: Arial, Helvetica, sans-serif;
              text-decoration: none;
              border: none !important;
          }
  
          .container {
              width: 100%;
              padding: 0.5rem;
          }
  
          .table_one {
              height: 100%;
              width: 100%;
              background-color: white;
              padding-top: 1rem;
              padding-bottom: 1rem;
          }
  
          table {
              border-collapse: collapse;
          }
  
          .img_one {
              width: 15rem;
              margin-left: 2rem;
          }
  
          #td_2 {
              float: right;
              margin-right: 2rem;
              background-color: #22b7cb;
              color: white;
              padding: 10px;
          }
  
          #td_3 {
              background: #000;
              width: 100%;
              height: 1px;
          }
  
          #td_3 p {
              font-size: 1px;
          }
  
          .td_5 {
              float: left;
              padding-left: 2rem;
              padding-top: 1rem;
              padding-bottom: 0.5rem;
          }
  
          .td_4 {
              padding-left: 2rem;
              padding-top: 1rem;
              padding-bottom: 0.5rem;
          }
  
          #td_6 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
              color: #22b7cb;
          }
  
          #td_7 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
              color: #22b7cb;
          }
  
          #td_8 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_9 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_10 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_11 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_12 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_13 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_17 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
              padding-top: 0.5rem;
          }
  
          #td_19 {
              padding-left: 2rem;
              padding-bottom: 0.5rem;
          }
  
          #td_18 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 0.5rem;
              padding-top: 0.5rem;
          }
  
          #td_14 {
              padding-left: 2rem;
              padding-bottom: 1rem;
              padding-top: 1rem;
          }
  
          #td_15 {
              float: left;
              padding-left: 2rem;
              padding-bottom: 1rem;
              padding-top: 1rem;
          }
  
          #td_16 {
              background-color: black;
              width: 100%;
              width: 1px;
              font-size: 1px;
          }
  
          .table_two {
              height: 100%;
              width: 100%;
              background-color: white;
              padding-top: 1rem;
              padding-bottom: 1rem;
          }
  
          .description {
              width: 40%;
          }
  
          #td-1 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          #td-2 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          #td-3 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          #td-4 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          #td-5 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
              background: #22b7cb;
              color: white;
              text-align: start;
          }
  
          .img_two {
              height: 2.5rem;
              width: 2.5rem;
          }
  
          #td-6 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-7 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-8 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-9 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-10 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-11 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-12 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-13 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-14 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          #td-15 {
              padding-left: 2rem;
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
          }
  
          .border {
              background: #000;
              width: 100%;
              height: 1px;
              font-size: 1px;
          }
  
          .heading {
              background: #22b7cb;
          }
  
          .table_head {
              padding-left: 2rem;
              text-align: start;
          }
  
          .table_three {
              width: 100%;
          }
  
          .headId {
              width: 70%;
          }
  
          .table_body {
              padding-left: 2rem;
              padding-top: 0.5rem;
          }
  
          .table_span {
              padding: 5px;
              border: 1px solid black;
          }
  
          #sign {
              text-align: end;
              padding-top: 7rem;
              padding-bottom: 1rem;
              padding-right: 2rem;
          }
  
          .button-warper {
              white-space: nowrap;
              padding-top: 0.5rem 1rem;
          }
      </style>
  </head>
  
  <body>
      <div style="width: 100%;max-width:720px;margin:auto; background-color: rgb(238,238,238);">
          <table style="width: 100%; ">
              <tr style="
                        width: 100%;
                        text-align: center;
                        background-color: #ffebf5;
                      ">
                  <td style="width: 100%; padding: 1rem;text-align:start">
                      <!-- <div style="text-align: start"> -->
                      
  
                      <!-- </div> -->
                  </td>
                  <td style="
                          background-color: transparent;
                          border-color: transparent;
                          padding: 1rem;
                        ">
                
                  </td>
              </tr>
              <tr style="width: 100%; height: 18rem">
                  <td colspan="2" style="padding: 1rem">
                      ${html}
                  </td>
              </tr>
             
  
          </table>
          <div style="width: 100%; text-align: center; padding: 2rem;">
              <p style="color: rgb(113, 113, 113) ;">${env_config_1.default.APP_NAME}</p>
          </div>
          <div style="width: 100%; text-align: center; padding: 2rem;">
              <p style="color: rgb(113, 113, 113) ; font-size: 12px;">You're receiving this email because you
                  signed up for a ${env_config_1.default.APP_NAME}
                  account.</p>
          </div>
      </div>
  </body>
  
  </html>`;
function sendEmail({ to, subject, text, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const mailOptions = {
                    from: env_config_1.default.APP_EMAIL,
                    to,
                    subject,
                    html: htmlTemplate(text),
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
exports.sendEmail = sendEmail;
