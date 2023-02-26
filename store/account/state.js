export default function () {
  return {
    webPalette: {
      logo: "https://image.smart-ai-api.com/public/Rico-main-resite/logo.png",
      palette: {
        card: {
          cardBgColor: {
            label: "สี card",
            type: "color",
            value: "#FFFFFF",
          },
          cardTextColor: {
            label: "สีตัวอักษรใน card",
            type: "color_text",
            value: "#000000FF",
          },
        },
        menu: {
          textColor: {
            label: "สีตัวอักษรเว้ปไซต์",
            type: "color_text",
            value: "#000000FF",
          },
          bgColor: {
            label: "สีพื้นหลัง Background ด้านนอก",
            type: "color",
            value: "#FFFFFF",
          },
          bgColorIner: {
            label: "สีพื้นหลัง Background ด้านใน",
            type: "color",
            value: "#FFFFFF",
          },
          navberColor: {
            label: "สีพื้นหลัง navber ข้างบน",
            type: "color",
            value: "#FFFFFF",
          },
          sidebarColor: {
            label: "สีพื้นหลัง sidebar ด้านข้าง",
            type: "color",
            value: "#FFFFFF",
          },
          textColor_withIcon: {
            label: "สีตัวอักษรเมนูและไอคอน",
            type: "color_text",
            value: "#000000FF",
          },
          activeMenuColor: {
            label: "สีตอนกดปุ่ม menu",
            type: "color",
            value: "#9155FD",
          },
        },
        table: {
          colorTable: {
            label: "สีหัวตาราง",
            type: "linear",
            value: "linear-gradient(#722bbb 0%, #9c64d7 100%)",
          },
          colorTextTable: {
            label: "สีตัวอักษรหัวตาราง",
            type: "color_text",
            value: "#000000FF",
          },
        },
      },
      Image:null
    },
  };
}
