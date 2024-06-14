// mail
import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId} : any) => {
    try{

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        console.log("Mail", userId);
        console.log("Email Type ", emailType);
        console.log("Email Type", typeof emailType);


        if( emailType === "VERIFY"){
            console.log("Verify Section")

            const updatedUser = await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        verifyToken: hashedToken,
                        veryfyTokenExpiry : Date.now() + 3600000 
                    }
                }
            )
            console.log("Updated User", updatedUser)
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
            {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordExpiry: Date.now() + 3600000
                }
            })
        }

        console.log("Out of else if block")


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c892f3540253f9",  // chintajank bat hai
              pass: "540340642ca52e"   // galat baaat hai, 
            }
        });

        const mailOptions = {
            from: 'shivamftp65@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> tp ${emailType === "VERIFY" ? "Verify your email" : "reset your password"}
                     or copy and paste the link below in your browser.
                    <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`, // html body
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    } catch(error: any){
        throw new Error(error.message)
    }
} 