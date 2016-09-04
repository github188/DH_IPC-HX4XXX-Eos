#!/bin/sh

# This is a sample, you should rewrite it according to your chip #
# clock will be closed at uboot, so you needn't call it!

clk_close()
{
	# Below clock operation is all from Hi3516A, you should modify by datasheet!
	echo "clock close operation done!"
}

# open module clock while you need it!
clk_cfg()
{
	himm 0x1201003c 0x900;		# MIPI VI ISP unreset
	himm 0x12010050 0x2;		# VEDU0 unreset	
	himm 0x12010058 0x2;		# VPSS0 unreset 
	himm 0x1201005c 0x2;		# VGS unreset 
	himm 0x12010060 0x2;		# JPGE unreset 
	himm 0x12010064 0x2;		# TDE unreset 
	himm 0x1201006c 0x2;		# IVE unreset      
	himm 0x12010070 0x2;		# FD unreset
	himm 0x12010074 0x2;		# GDC unreset 
	himm 0x1201007C 0x2a;		# HASH&CIPHER unreset   add ADC clock
	himm 0x12010080 0x2;		# AIAO unreset,clock 1188M
	himm 0x12010084 0x2;		# GZIP unreset  
	himm 0x120100d8 0xa;    	# ddrt efuse enable clock, unreset
	himm 0x120100e0 0xa0;   	# rsa trng enable clock, unreset
	himm 0x12010040 0x60;
	himm 0x12010040 0x0;		# sensor unreset,unreset the control module with slave-mode
	
	#VDP_OUT 
	
	#himm 0x12010044 0x00004ff4     # 1080p30 BT1120
	himm 0x12010044 0x00015ff4	# D1@30fps,BT656 CVBS
	
	#                IVE[21:19] GDC[18:16] VGS[15:13] VEDU [12:10] VPSS0[7:5] VIMIPI[2:0]
	# current config£ºIVE:300M,  GDC:300M,  VGS:300M,  VEDU:500M,   VPSS:300M  VIMIPI:300M---0x00094c63
	# himm 0x1201004c 0x00094c63
	# SDK config:     IVE:300M,  GDC:475M,  VGS:475M,  VEDU:500M,   VPSS:300M  VIMIPI:300M---0x000d6c63
	himm 0x1201004c 0x000d6c63

	# ISP 300M
	himm 0x1201003c 0x00000900

	# configure with different sensor type
	# sensor £¨226 --0x11 72M£©£¨317--0x11 72M£©£¨34120--0x12 54M£© £¨34220--0x18 37.125M£©
	himm 0x12010040 0x11;           #226  8 lane sensor clock 72M

	# cipher clock 200M 
	himm 0x1201007c 0x2a

	echo "clock configure operation done!"
}

#clk_close
clk_cfg
