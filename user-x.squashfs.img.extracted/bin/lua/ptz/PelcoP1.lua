-- PELCOP的协议主要在于校验柆不一样，这个２－６位字节求异或

local Protocol = {};

-- 表示数值可以用16或10进制(最小值，最大值)
Protocol.Attr = 
{
		-- 协议的显示名称,不能超过16字符
		Name = "PELCOP1",	
		
		-- 指明是云台协议还是矩阵协议
		Type = "PTZ",
		
		-- 以ms为单位
		Internal = 200,
			
		-- 云台地址范围
		CamAddrRange 		= {0x01, 0x1F}, 
		-- 监视地址范围
		MonAddrRange		= {0x00, 0xFF},	
		-- 预置点范围
		PresetRange 		= {0x00, 0xFF},
		-- 自动巡航线路范围
			TourRange			= {0x01, 0x01},
		-- 轨迹线路范围
		PatternRange			= {0x01, 0x05},
		-- 垂直速度范围
		TileSpeedRange 		= {0x01, 0x3F},
		-- 水平速度范围
		PanSpeedRange 		= {0x01, 0x3F},
		-- 自动扫描范围
		ScanRange 			= {0x01, 0xff},
		
		-- 辅助范围
		AuxRange 			= {0x01, 0x08},
}

Protocol.CommandAttr =
{
	-- 协议中需要更改的位置，用LUA下标表示，即下标从１开始
	AddrPos = 2, 
	PresetPos = 6, 
	TileSpeedPos = 6,
	PanSpeedPos = 5,
	AuxPos = 6,
}


Protocol.Command = 
{
	-- 写具体协议时只能用16进制或字符表示, 没有
	Start= 
	{
		--写上下左右, 左上，左下，右上，右下
		TileUp 		= "0xa0, 0x00, 0x00, 0x08, 0x00, 0x1F, 0xaf, 0x00,",
		TileDown 	= "0xa0, 0x00, 0x00, 0x10, 0x00, 0x1F, 0xaf, 0x00,",
		PanLeft 	= "0xa0, 0x00, 0x00, 0x04, 0x2f, 0x00, 0xaf, 0x00,", 
		PanRight 	= "0xa0, 0x00, 0x00, 0x02, 0x2f, 0x00, 0xaf, 0x00,",
		LeftUp 		= "0xa0, 0x00, 0x00, 0x0c, 0x2f, 0x00, 0xaf, 0x00,",
		LeftDown 	= "0xa0, 0x00, 0x00, 0x14, 0x2f, 0x00, 0xaf, 0x00,",
		RightUp		= "0xa0, 0x00, 0x00, 0x0a, 0x2f, 0x00, 0xaf, 0x00,",
		RightDown = "0xa0, 0x00, 0x00, 0x12, 0x2f, 0x00, 0xaf, 0x00,",
		
		ZoomWide 	= "0xa0, 0x00, 0x00, 0x40, 0x00, 0x00, 0xaf, 0x00",
		ZoomTele 	= "0xa0, 0x00, 0x00, 0x20, 0x00, 0x00, 0xaf, 0x00,",
		FocusNear = "0xa0, 0x00, 0x02, 0x00, 0x00, 0x00, 0xaf, 0x00,",
		FocusFar 	= "0xa0, 0x00, 0x01, 0x00, 0x00, 0x00, 0xaf, 0x00",
		IrisSmall	= "0xa0, 0x00, 0x08, 0x00, 0x00, 0x00, 0xaf, 0x00,",
		IrisLarge = "0xa0, 0x00, 0x04, 0x00, 0x00, 0x00, 0xaf, 0x00",
			
		-- 灯光
		LightOn			= "0xa0, 0x00, 0x50, 0x00, 0x00, 0x00, 0xaf,0x00",
		LightOff  	= "0xa0, 0x00, 0x00, 0x00, 0x00, 0x00, 0xaf,0x00",
			
		-- 预置点操作（设置，清除，转置)
		SetPreset 	= "0xa0, 0x00, 0x00, 0x03, 0x00, 0x21, 0xaf, 0x00",
		ClearPreset	= "0xa0, 0x00, 0x00, 0x05, 0x00, 0x21, 0xaf, 0x00",
		GoToPreset 	= "0xa0, 0x00, 0x00, 0x07, 0x00, 0x21, 0xaf, 0x00",			
			
		-- 水平旋转，在预先设置的边界中间转动
		SetLeftLimit 	= "0xa0, 0x00, 0x00, 0x11, 0x00, 0x21, 0xaf, 0x00",
		SetRightLimit	= "0xa0, 0x00, 0x00, 0x13, 0x00, 0x21, 0xaf, 0x00", 
		AutoScanOn 		= "0xa0, 0x00, 0x00, 0x1B, 0x00, 0x21, 0xaf, 0x00",
		AutoScanOff		= "0xa0, 0x00, 0x00, 0x1D, 0x00, 0x21, 0xaf, 0x00",
		
		-- 轨迹巡航, 一般指模式(设置开始，设置结束，运行，停止，清除模式
		SetPatternStart = "0xa0, 0x00, 0x00, 0x1f, 0x00, 0x01, 0xaf, 0x00",
		SetPatternStop 	= "0xa0, 0x00, 0x00, 0x21, 0x00, 0x01, 0xaf, 0x00",
		StartPattern 	= "0xa0, 0x00, 0x00, 0x23, 0x00, 0x01, 0xaf, 0x00",
    StopPattern     = "0xa0, 0x00, 0x00, 0x00, 0x00, 0x00, 0xaf, 0x00,",
		
		AuxOn 	= "0xa0, 0x00, 0x00, 0x09, 0x00, 0x21, 0xaf, 0x00,",
		AuxOff 	= "0xa0, 0x00, 0x00, 0x0b, 0x00, 0x21, 0xaf, 0x00,",
		
		Position = "0x3a, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00,0x00, 0xff",	
		
	},
	Stop = 
	{
		TileUp 		= "0xa0, 0x0, 0x00, 0x0, 0x0, 0x0, 0xaf,0x0,",
		TileDown 	= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0",
		PanLeft 	= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0",
		PanRight 	= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0",
		LeftUp 		= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
		LeftDown 	= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
		RightUp		= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
		RightDown = "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
			
		ZoomWide 	= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
		ZoomTele 	= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
		FocusNear = "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
		FocusFar 	= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
		IrisSmall = "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
		IrisLarge	= "0xa0,0x0,0x00,0x0,0x0, 0x0, 0xaf,0x0,",
	},
}

Protocol.Checksum = function (s)
	if s[1] ~= 0x3a then
		local value = s[2];
		for i = 3, 6 do
			value = bits.bxor(value,s[i]);
		end;
		s[8] = math.mod(value, 256);
	end;
	return s;
end;

Protocol.CamAddrProcess = function(s, addr)
	local addr = math.mod(addr,256);
	if s[1] ~= 0x3a then
		s[Protocol.CommandAttr.AddrPos] = addr;
	else
		s[2] = addr;
	end;
	return s;
end;

Protocol.SpeedProcess = function(s, ver, hor)
	if s[4] ~= 0x00 then
		s[6] = ver;
		s[5] = hor;
	end;
	return s;
end;

Protocol.PatternProcess = function(s, num)
	s[6] = num;
	return s;	
end;

Protocol.PositionProcess = function(s, hor, ver, zoom)
	-- 下面只处理快速定位功能
	local max_pos_zoom = 16;
	if s[1] == 0x3a then
		s[4] = bits.band(hor,0xff00)/256;
		s[5] = bits.band(hor, 0xff);
		s[6] = bits.band(ver,0xff00)/256;
		s[7] = bits.band(ver,0xff);
		if zoom == 0 then
			s[8] = 0;
		else 
			if math.abs(zoom) > max_pos_zoom then
				s[8] = max_pos_zoom; 
			else 
				s[8] = math.abs(zoom);
			end;
			s[8] = zoom > 0 and s[8] or 0x80 + s[8];
		end
		s[9] = math.mod((s[2] + s[3] + s[4] + s[5] + s[6] + s[7] + s[8]), 256);
		return s;
	end;	
end;

--[[
--下面的函数是可选的，除非有特殊处理过程才打开，没有的话，千万不要打开，否则会造成解析出错
Protocol.CamAddrProcess = function(s, addr)
	-- 传入的地址0代表camaddr 1
	s[Protocol.CommandAttr.AddrPos] = addr;
	return s;
end;

Protocol.MonAddrProcess = function(s, addr)
	return s;
end;

Protocol.SpeedProcess = function(s, arg1, arg2)
	return s;
end;

Protocol.PresetProcess = function(s, arg1, arg2))
	return s;
end;
--]]

return Protocol;