package com.idte.rest;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Hashtable;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.EncodeHintType;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.idte.rest.data.Attendee;

public class QRCode
{
    //Reference the Attendee class
    static Attendee attendee = new Attendee();

    public static void main(String[] args) throws WriterException, IOException {
        // This is what will be stored in the QR code
        String qrCodeText = attendee.getId();
        //Image file name to save to
        String filePath = "QRCode.png";
        int size = 125;
        //Define the location where the image would be saved
        File qrFile = new File(filePath);
        createQRImage(qrFile, qrCodeText, size, filePath);
       // readQRImage(qrFile);
        System.out.println("DONE");
    }

    private static void createQRImage(File qrFile, String qrCodeText, int size, String filePath) throws WriterException, IOException
    {
        //Create ByteMatrix for QRCode that would encode the value
        Hashtable<EncodeHintType, ErrorCorrectionLevel> hintMap = new Hashtable<>();
        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix byteMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, size, size, hintMap);
        // Make bufferedImage that holds the QR code
        int matrixWidth = byteMatrix.getWidth();
        BufferedImage image = new BufferedImage(matrixWidth, matrixWidth, BufferedImage.TYPE_INT_RGB);
        image.createGraphics();

        Graphics2D graphics = (Graphics2D) image.getGraphics();
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, matrixWidth, matrixWidth);
        // Paint and save the image using the ByteMatrix
        graphics.setColor(Color.BLACK);

        for (int i = 0; i < matrixWidth; i++)
        {
            for (int j = 0; j < matrixWidth; j++)
            {
                if (byteMatrix.get(i, j))
                {
                    graphics.fillRect(i, j, 1, 1);
                }
            }
        }
        ImageIO.write(image, filePath, qrFile);

    }

    /*
    //QR code contains the attendee ID
    private static String readQRImage(File qrFile) throws WriterException, IOException
    {
        BufferedImage bufferedImage = ImageIO.read(qrFile);
        LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));

        try 
        {
            Result result = new MultiFormatReader().decode(bitmap);
            return result.getText();
        }
        catch (NotFoundException e)
        {
            System.out.println("There is no QR code in the image");
            return null;
        }
    }
    */
}