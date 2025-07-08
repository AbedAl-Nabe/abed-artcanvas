import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { success: false, message: "Email service not configured" },
        { status: 500 }
      );
    }

    // Prepare email payload
    const emailPayload: any = {
      from: "ArtCanvas <onboarding@resend.dev>",
      to: ["abedkoubiessy71@gmail.com"],
      subject: "🎨 New Art Commission Request - ArtCanvas",
      html: buildEmailHtml(formData),
    };

    // Add attachment if image exists
    if (formData.imageData) {
      emailPayload.attachments = [
        {
          content: formData.imageData.split("base64,")[1],
          filename: "customer-reference.png",
          type: "image/png",
          disposition: "attachment",
        },
      ];
    }

    console.log("Sending email with Resend API...");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return NextResponse.json(
        {
          success: false,
          message: `Email service error: ${response.status}`,
          details: errorData,
        },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      emailId: result.id,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper function to build the email HTML
function buildEmailHtml(formData: any) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); color: white; border-radius: 16px; overflow: hidden;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%); padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: black;">
          🎨 New Commission Request
        </h1>
        <p style="margin: 10px 0 0 0; color: rgba(0,0,0,0.8); font-size: 16px;">
          ArtCanvas - Premium Art Studio
        </p>
      </div>
      
      <!-- Customer Information -->
      <div style="padding: 30px;">
        <div style="background: rgba(217, 119, 6, 0.1); border: 1px solid rgba(217, 119, 6, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #F59E0B; margin-top: 0; font-size: 20px; display: flex; align-items: center;">
            👤 Customer Information
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #F59E0B; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: white;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #F59E0B;">Email:</td>
              <td style="padding: 8px 0; color: white;">${formData.email || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #F59E0B;">Phone:</td>
              <td style="padding: 8px 0; color: white;">
                <a href="https://wa.me/${formData.phone.replace(/[^0-9]/g, "")}" 
                   style="color: #10B981; text-decoration: none; font-weight: bold;">
                  📱 ${formData.phone}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #F59E0B;">Location:</td>
              <td style="padding: 8px 0; color: white;">${formData.location || "Not provided"}</td>
            </tr>
          </table>
        </div>

        <!-- Commission Details -->
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #10B981; margin-top: 0; font-size: 20px;">
            🎨 Commission Details
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #10B981; width: 120px;">Canvas Size:</td>
              <td style="padding: 8px 0; color: white;">${formData.size} ${formData.size === "A4" ? "(21 × 29.7 cm)" : "(29.7 × 42 cm)"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #10B981;">Border Color:</td>
              <td style="padding: 8px 0; color: white; text-transform: capitalize;">${formData.borderColor || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #10B981;">Price:</td>
              <td style="padding: 8px 0; color: white; font-size: 18px; font-weight: bold;">
                💰 ${formData.size === "A4" ? "$30" : "$50"}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #10B981;">Submitted:</td>
              <td style="padding: 8px 0; color: white;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>

        ${formData.imageData ? `
        <!-- Customer Image Reference -->
        <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
          <h2 style="color: #8B5CF6; margin-top: 0; font-size: 20px;">
            📸 Customer's Reference Image
          </h2>
          <p style="color: #C4B5FD; margin: 10px 0 0 0; font-size: 14px;">
            ✨ Reference image attached to this email (see attachments)
          </p>
        </div>
        ` : ""}

        <!-- Action Buttons -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://wa.me/${formData.phone.replace(/[^0-9]/g, "")}" 
             style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; margin: 10px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
            💬 Contact via WhatsApp
          </a>
          ${formData.email ? `
          <a href="mailto:${formData.email}" 
             style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; margin: 10px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);">
            📧 Send Email
          </a>
          ` : ""}
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px 0; border-top: 1px solid rgba(217, 119, 6, 0.3); margin-top: 30px;">
          <p style="color: #9CA3AF; margin: 0; font-size: 14px;">
            🎨 <strong>ArtCanvas</strong> - Premium Art Studio
          </p>
          <p style="color: #6B7280; margin: 5px 0 0 0; font-size: 12px;">
            Transforming precious moments into timeless masterpieces
          </p>
        </div>
      </div>
    </div>
  `;
}