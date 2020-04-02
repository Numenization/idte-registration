package com.idte.rest;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Hashtable;

import javax.imageio.ImageIO;

import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamPanel;
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


public class QRCode
{
    public static void createQRImage(File qrFile, String qrCodeText, int size, String filePath) throws WriterException, IOException
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
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        baos.flush();
        byte[] imageBytes = baos.toByteArray();

        //write to file 
        try {
            OutputStream os = new FileOutputStream(qrFile);
            os.write(imageBytes);
            os.close();
          } catch (Exception e) {
            e.printStackTrace();
          }

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

    public static String ReadQRCodeWithScanner()
    {
        //Create Webcam object
        Webcam webcam = Webcam.getDefault();
        webcam.setViewSize(new Dimension(320,240));
        WebcamPanel webcamPanel = new WebcamPanel(webcam);
        webcamPanel.setMirrored(true);

        BufferedImage image = null;
        Result result = null;

        //String value to store the value in the QR code
        String qrCodeText;

        do
        {
            if (webcam.isOpen())
            {
                if ((image = webcam.getImage()) == null)
                {
                    continue;
                }

                LuminanceSource source = new BufferedImageLuminanceSource(image);
                BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));

                try
                {
                    result = new MultiFormatReader().decode(bitmap);
                }
                catch (NotFoundException e)
                {
                    //Fall thru, there is no QR code in the image
                }

            }

            //This will return the qrCodeText value
            if (result != null)
            {
                qrCodeText = result.getText();                
                return qrCodeText;
            }

            
        } while (true);
    }
}