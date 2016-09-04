#!/bin/sh

# This is a sample, you should rewrite it according to your chip #
# You can configure your pinmux for the application here!

#VICAP default setting is VIU
vicap_pin_mux()
{
	himm 0x12040000 0x1;	# 0:GPIO1_4         1:SENSOR0_CLK
	himm 0x12040004 0x0;	# 0:SENSOR0_RSTN    1:GPIO1_5
	himm 0x12040008 0x1;	# 0:GPIO1_6         1:SENSOR0_HS
	himm 0x1204000c 0x1;	# 0:GPIO1_7         1:SENSOR0_VS
	himm 0x12040010 0x1;	# 0:GPIO2_0         1:FLASH_TRIG
	himm 0x12040014 0x1;	# 0:GPIO2_1         1:SHUTTER_TRIG
}

#i2c0 -> sensor
i2c0_pin_mux()
{
	himm 0x1204007c 0x2;    # 0:GPIO5_3         1:SPI0_SCLK        2:I2C0_SCL         3:spi0_3wire_clk
	himm 0x12040080 0x2;	# 0:GPIO5_4         1:SPI0_SDO         2:I2C0_SDA         3:spi0_3wire_data
}

#i2c3 -> aic31/9024
i2c3_pin_mux()
{
	himm 0x1204009c 0x1;	# 0:GPIO6_3         1:I2C3_SDA
	himm 0x120400a0 0x1;	# 0:GPIO6_4         1:I2C3_SCL
}

#i2c2 -> adv7179
i2c2_pin_mux()
{
	himm 0x1204005c 0x3;
	himm 0x12040078 0x3;
}

spi0_drive_capability()
{
	himm 0x1204087c 0x120;	#SPI0_SCLK
	himm 0x12040880 0x120;	#SPI0_SDO 
	himm 0x12040884 0x120;	#SPI0_SDI 
	himm 0x12040888 0x120;	#SPI0_CSN
}

#spi2 -> LCD
spi2_pin_mux()
{
	#pinmux
	himm 0x1204003C 0x2;	
	himm 0x1204005C 0x2;	
	himm 0x12040074 0x2;	
	himm 0x12040078 0x2;	
	#drive capability
	himm 0x1204083c 0x120;
	himm 0x1204085c 0x120;
	himm 0x12040874 0x120;
	himm 0x12040878 0x120;
}

vo_output_mode()
{
	himm 0x12040018 0x1; 	#VO_CLK  
	himm 0x1204001C 0x1; 	#VO_DATA0
	himm 0x12040020 0x1; 	#VO_DATA1
	himm 0x12040024 0x1; 	#VO_DATA2
	himm 0x12040028 0x1; 	#VO_DATA3
	himm 0x1204002C 0x1; 	#VO_DATA4
	himm 0x12040030 0x1; 	#VO_DATA5
	himm 0x12040034 0x1; 	#VO_DATA6
	himm 0x12040038 0x1; 	#VO_DATA7
	
	#pinmux with net
	himm 0x12040040 0x2;	#VO_DE    
	himm 0x12040044 0x2;	#VO_DATA10
	himm 0x12040048 0x2;	#VO_VS    
	himm 0x1204004C 0x2;	#VO_DATA9 
	himm 0x12040050 0x2;	#VO_HS    
	himm 0x12040054 0x2;	#VO_DATA11
	himm 0x12040058 0x2;	#VO_DATA15
	himm 0x12040060 0x2;	#VO_DATA14
	himm 0x12040064 0x2;	#VO_DATA13
	himm 0x12040068 0x2;	#VO_DATA12
	himm 0x12040070 0x2;	#VO_DATA8
}

vo_drive_capability()
{	
	himm 0x12040818 0x40;   #VO_CLK 
	himm 0x1204081c 0x110;	#VO_DATA0
	himm 0x12040820 0x110;	#VO_DATA1
	himm 0x12040824 0x110;	#VO_DATA2
	himm 0x12040828 0x110;	#VO_DATA3
	himm 0x1204082c 0x110;	#VO_DATA4
	himm 0x12040830 0x110;	#VO_DATA5
	himm 0x12040834 0x110;	#VO_DATA6
	himm 0x12040838 0x110;	#VO_DATA7
	
	himm 0x12040870 0x150;	#VO_DATA8
	himm 0x1204084c 0x1d0;	#VO_DATA9
	himm 0x12040844 0x1d0;	#VO_DATA10
	himm 0x12040848 0x1d0;	#hs 
	himm 0x12040850 0x1d0;	#vs
	himm 0x12040854 0x110;	#VO_DATA11
	himm 0x12040868 0x110;	#VO_DATA12
	himm 0x12040864 0x110;	#VO_DATA13
	himm 0x12040860 0x110;	#VO_DATA14
	himm 0x12040858 0x110;	#VO_DATA15
}

#rgmii
net_rgmii_mode()
{  
	himm 0x12040040 0x1;	  
	himm 0x12040044 0x1;	
	himm 0x12040048 0x1;	  
	himm 0x1204004C 0x1;	
	himm 0x12040050 0x1;	
	himm 0x12040054 0x1;	
	himm 0x12040058 0x1;	
	himm 0x12040060 0x1;	
	himm 0x12040064 0x1;	
	himm 0x12040068 0x1;	
	himm 0x12040070 0x1;	
	himm 0x1204003C 0x1;	
	himm 0x1204005C 0x1;	
	himm 0x12040074 0x1;	
	himm 0x12040078 0x1;	
}

net_rgmii_drive_capability()
{
	himm 0x12040840 0xc0;    #RGMII_TX_CLK
	himm 0x12040844 0xd0;    #RGMII_TXD0
	himm 0x12040848 0xd0;    #RGMII_TXD1
	himm 0x1204084C 0xd0;    #RGMII_TXD2
	himm 0x12040850 0xd0;    #RGMII_TXD3
	himm 0x12040854 0x130;   #RGMII_RX_CLK
	himm 0x12040858 0x130;   #RGMII_RX_DV
	himm 0x12040860 0x130;   #RGMII_RXD1
	himm 0x12040864 0x130;	 #RGMII_RXD2
	himm 0x12040868 0x130;	 #RGMII_RXD3
	himm 0x12040870 0x50;	 #EPHY_CLK
	himm 0x1204083C 0xd0;    #RGMII_TX_EN
	himm 0x1204085C 0x130;	 #RGMII_RXD0
	himm 0x12040874 0x120;	 #MDCK
	himm 0x12040878 0x120;	 #MDIO
}
    

i2s_pin_mux()
{
	himm 0x120400cc	 0x1;	 #I2S_SD_TX  
	himm 0x120400d0	 0x1;	 #I2S_WS_TX  
	himm 0x120400d4	 0x1;	 #I2S_MCLK   
	himm 0x120400d8	 0x1;	 #I2S_SD_RX  
	himm 0x120400dc	 0x1;	 #I2S_BCLK_RX
	himm 0x120400e0	 0x1;	 #I2S_BCLK_TX
	himm 0x120400e4	 0x1;	 #I2S_WS_RX  
	
	#i2s drive_capability
	himm 0x120408DC 0x120;	#I2S_SD_TX  
	himm 0x120408E0 0x120;	#I2S_WS_TX  
	himm 0x120408E4 0x120;	#I2S_MCLK   
	himm 0x120408EC 0x120;	#I2S_BCLK_RX
	himm 0x120408F0 0x120;	#I2S_BCLK_TX
	himm 0x120408F4 0x120;	#I2S_WS_RX  
}

######################parse arg###################################
b_arg_vo=0
b_arg_net=0
vo_type="CVBS"
for arg in $@
do
	if [ $b_arg_vo -eq 1 ] ; then
		if [ $vo_type = "LCD" ] ; then
			lcd_type=$arg;
			break;
		else
			vo_type=$arg;
		fi
	fi

	case $arg in
		"-vo")
			b_arg_vo=1;
			;;
		"-net")
			b_arg_net=1;
			;;
	esac
done
#######################parse arg end########################

#######################Action###############################
if [ $b_arg_vo -eq 1 ]; then
	case $vo_type in
		"BT1120")
			himm 0x12010044 0x4ff4;
			vo_output_mode;
			vo_drive_capability;
			i2c3_pin_mux;
			insmod extdrv/sil9024.ko norm=12    #1080P@30fps
			echo "===========VO TYPE BT1120===========";			
			;;
		"CVBS")
			himm 0x12010044 0x15ff4;
			echo "===========VO TYPE CVBS=============";
			;;
		"BT656")
			himm 0x12010044 0x15ff4;
			vo_output_mode;
			vo_drive_capability;
			i2c2_pin_mux;
			rmmod adv_7179;              
			insmod extdrv/adv_7179.ko;                #PAL in default, 
			#insmod extdrv/adv_7179.ko norm_mode=1;   #NTSC 
			echo "===========VO TYPE BT656============";			
			;;
		"LCD")
			vo_output_mode;
			vo_drive_capability;
			spi2_pin_mux;
			case $lcd_type in
				"9342-6bit")
					himm 0x12010044 0x1aff4;
					himm 0x12010048 0x8152306;					
					rmmod ssp_ili9342h_6bit;
					insmod extdrv/ssp_ili9342h_6bit.ko;
					echo "============VO TYPE LCD 9342-6bit============="					
					;;
				"9341-6bit")
					himm 0x12010044 0x1aff4;
					himm 0x12010048 0x8169f00;					
					rmmod ssp_ili9341v_6bit;
					insmod extdrv/ssp_ili9341v_6bit.ko;
					echo "============VO TYPE LCD 9341-6bit============="					
					;;
				"9341-16bit")
					himm 0x12010044 0x18ff4;
					himm 0x12010048 0x8169f00;					
					rmmod ssp_ili9341v_16bit;
					insmod extdrv/ssp_ili9341v_16bit.ko;
					echo "============VO TYPE LCD 9341-16bit============="
					;;
				"5182-8bit")
					himm 0x12010044 0x1bff4;
					himm 0x12010048 0x82ad11d;					
					rmmod ssp_ota5182;
					insmod extdrv/ssp_ota5182.ko;
					echo "============VO TYPE LCD 5182-8bit============="
					;;
			esac
			;;
	esac
fi

if [ $b_arg_net -eq 1 ]; then
	echo "==============NET MODE================";
	net_rgmii_mode;
	#net_rgmii_drive_capability;
fi

vicap_pin_mux;
#i2c0_pin_mux;
#i2c3_pin_mux;
spi0_drive_capability;
#i2s_pin_mux;
