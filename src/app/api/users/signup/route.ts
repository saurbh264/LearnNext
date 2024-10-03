import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        if(!username || !email || !password){
            return NextResponse.json({
                message:"Please Fill all the details correctly.",
                status: 401
            });
        }
        const user =await User.findOne({email});
        if(user){
            return NextResponse.json(
                {error: "User Already exists",
                 status: 400,
                }
            )
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });
        
        const savedUser = await newUser.save();
        return NextResponse.json({
            success:true,
            message: "User created successfully."
        });
        
    }
    catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            {
                error: error.message
            },
            { status: 500 }
        )


    }
}