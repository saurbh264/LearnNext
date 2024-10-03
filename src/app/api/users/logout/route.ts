import { NextResponse } from "next/server";

export async function GET() {
  try {
     const response = NextResponse.json(
        {message:"Logout Successful",
         success:true,
        },
    {status:200});
    response.cookies.set("token","",{
        httpOnly:true
    });
    return response;
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
