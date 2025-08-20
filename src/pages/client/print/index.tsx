import { useEffect } from "react";
const SVFPrint = () => {

    const getPrinters = async () => {
        try {
          const response = await fetch(
            "https://localhost:44543/printers?driverName=true&printerResol=true&trayInfo=true"
          );
      
          const result = await response.json();
      
          if (result.status === 0 && result.printer) {
            // parse chuỗi JSON trong field "printer"
            const printers = JSON.parse(result.printer);
            console.log("Danh sách máy in:", printers);
      
            // ví dụ: lấy danh sách tên máy in
            const printerList = Object.values(printers).map((p: any) => {
              // p dạng: "Microsoft+Print+to+PDF,Microsoft Print To PDF,600,0"
              const parts = p.split(",");
              return parts[1]; // lấy tên hiển thị
            });
      
            console.log("Printer names:", printerList.join("\n"));
          } else {
            alert("Không lấy được danh sách máy in");
          }
        } catch (err) {
          console.error("Không kết nối được SVF Agent:", err);
        }
    };

    useEffect(() => {
        getPrinters();
    }, []);

    const printPDF = async () => {
        try {
            // 1. Tải file PDF từ server
            const pdfResponse = await fetch("http://localhost:5173/makikata.pdf");
            const arrayBuffer = await pdfResponse.arrayBuffer();

            // 2. Convert sang Base64
            const base64String = btoa(
            new Uint8Array(arrayBuffer).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
            )
            );

        const response = await fetch("https://localhost:44543/print", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            printer: "Microsoft Print To PDF",
            dataType: "pdf",       // kiểu file
            contentType: "base64", // kiểu stream
            stream: base64String,  // dữ liệu pdf
            options: {
                copies: 1,
                duplex: false,
            },
            }),
        });

        const result = await response.json();
        console.log(result);
        
        if (result.status === 0) {
            alert("In thành công!");
        } else {
            console.error("SVF Agent trả về lỗi:", result);
            alert("In thất bại: " + result.statusmessage);
        }
        } catch (err) {
        console.error("Không kết nối được SVF Agent:", err);
        alert("SVF Agent chưa chạy hoặc port bị chặn.");
        }
    };

    return <button onClick={printPDF}>In PDF bằng SVF</button>;
};

export default SVFPrint;
