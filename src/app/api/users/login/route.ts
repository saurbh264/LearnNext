import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);
        if(!email || !password){
            return NextResponse.json({
                message:"Please Fill all the details correctly.",
                status: 401
            });
        }
        const user = await User.findOne({email});
        if(!user){
            console.log("User Doesn't exists");
            return NextResponse.json(
                {message: "No Such User exists"},
                {status: 400}
            )
        }
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({
                error:"Invalid Password. Try Again !",
                status:"401"
            })
        }
        // create a token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }

        // create token;
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        
        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
    }

    catch (error: any) {
        console.log(error);
        return NextResponse.json(
            {
                error: error.message
            },
            { status: 500 }
        )
    }
}