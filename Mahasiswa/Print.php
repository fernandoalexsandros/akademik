<?php

session_start();
?>
<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Akademik Mahasiswa</title>
	<!-- Library CSS -->
	<?php
	include "../koneksi.php";
	include "auth_user.php";
	require('../aset/pdf/fpdf.php');

	$pdf = new FPDF("L","cm","A4");

	$pdf->SetMargins(2,1,1);
	$pdf->AliasNbPages();
	$pdf->AddPage();
	$pdf->SetFont('Times','B',11);
	$pdf->Image('../aset/foto/mahasiswa.png',1,1,2,2);
	$pdf->SetX(4);            
	$pdf->MultiCell(19.5,0.5,'AKADEMIK MAHASISWA',0,'L');
	$pdf->SetX(4);
	$pdf->MultiCell(19.5,0.5,'Telpon : 082260583661',0,'L');    
	$pdf->SetFont('Arial','B',10);
	$pdf->SetX(4);
	$pdf->MultiCell(19.5,0.5,'JL. AKADEMIK MAHASISWA',0,'L');
	$pdf->SetX(4);
	$pdf->MultiCell(19.5,0.5,'website : www.idsdesign.com email : volcomzxy@gmail.com',0,'L');
	$pdf->Line(1,3.1,28.5,3.1);
	$pdf->SetLineWidth(0.1);      
	$pdf->Line(1,3.2,28.5,3.2);   
	$pdf->SetLineWidth(0);
	$pdf->ln(1);
	$pdf->SetFont('Arial','B',14);
	$pdf->Cell(25.5,0.7,"Jadwal Pelajaran",0,10,'C');
	$pdf->ln(1);
	$pdf->SetFont('Arial','B',10);
	$pdf->Cell(5,0.7,"Di cetak pada : ".date("D-d/m/Y"),0,0,'C');
	$pdf->ln(1);
	$pdf->SetFont('Arial','B',10);
	$pdf->Cell(1, 0.8, 'NO', 1, 0, 'C');
	$pdf->Cell(7, 0.8, 'Kode', 1, 0, 'C');
	$pdf->Cell(3, 0.8, 'Kode Dosen', 1, 0, 'C');
	$pdf->Cell(4, 0.8, 'Kode Ruangan', 1, 0, 'C');
	$pdf->Cell(4.5, 0.8, 'Jurusan', 1, 0, 'C');
	$pdf->Cell(4.5, 0.8, 'Hari', 1, 0, 'C');
	$pdf->Cell(2, 0.8, 'Jam', 1, 1, 'C');
	$pdf->SetFont('Arial','',10);
	$no=1;
	$periksa1= mysqli_connect("localhost","root","","akademik"); 
	$query=mysqli_query($periksa1,"select * from jadwal j join mahasiswa m where j.Kode_Jurusan_Jadwal = m.Kode_Jurusan_Mhs  ");
	while($lihat=mysqli_fetch_array($query)){
		$pdf->Cell(1, 0.8, $no , 1, 0, 'C');
		$pdf->Cell(7, 0.8, $lihat['Kode_Matakuliah_Jadwal'],1, 0, 'C');
		$pdf->Cell(3, 0.8, $lihat['NIP_Jadwal'], 1, 0,'C');
		$pdf->Cell(4, 0.8, $lihat['Kode_Ruangan_Jadwal'],1, 0, 'C');
		$pdf->Cell(4.5, 0.8, $lihat['Kode_Jurusan_Jadwal'], 1, 0,'C');
		$pdf->Cell(4.5, 0.8, $lihat['Hari'],1, 0, 'C');
		$pdf->Cell(2, 0.8, $lihat['Jam'], 1, 1,'C');
		$no++;
	}

	$pdf->Output("JadwalAkademik.pdf","I");

	?>


	  
	</html>
