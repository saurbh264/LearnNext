import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDatafromToken";
import User from "@/models/userModel";
import {connect }from "@/dbConfig/dbConfig"

export async function GET(request:NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const userdata = await User.findOne({_id:userID})
    .select("-password");
    return NextResponse.json({
        message:"User Found",
        data : userdata
    });
    
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
