import Cookies from "universal-cookie";
const cookies = new Cookies();

export const changeTitle = (title) => {
  document.title = `Plexaar Admin - ${title}` || "Plexaar Admin";
};

export const formatDate = (date) => {
  const getDay = (day) => {
    switch (day) {
      case "Mon":
        return "Monday";
      case "Tue":
        return "Tuesday";
      case "Wed":
        return "Wednesday";
      case "Thu":
        return "Thursday";
      case "Fri":
        return "Friday";
      case "Sat":
        return "Saturday";
      case "Sun":
        return "Sunday";
      default:
        return "";
    }
  };
  const getMonthNumber = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const dateArray = `${new Date(date.replace(/-/g, "/"))}`.split(" ");
  let month = Number(getMonthNumber[dateArray[1]]);
  if (month < 10) {
    month = (0, month);
  }
  const formattedDate = {
    day: Number(dateArray[2]),
    // month: Number(getMonthNumber[dateArray[1]]),
    monthName: dateArray[1],
    month: month,
    dayName: getDay(dateArray[0]),
    year: Number(dateArray[3]),
  };

  return formattedDate;
};

export const setCookies = (name, value, expires) => {
  var date = new Date();
  date.setTime(date.getTime() * 1000);
  cookies.set(name, value, {
    path: "/",
    expires: date,
  });
  console.log(date.getTime() *100000)
};

//get-cookie
export const getCookies = (name) => {
  return cookies.get(name);
};

//remove-cookies
export const removeCookies = (name) => {
  cookies.remove(name, { path: "/" });
};
export const addZeroToDate = (date) => {
  return (
    new Date(date).getFullYear() +
    "-" +
    ("0" + (new Date(date).getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date(date).getDate()).slice(-2)
  );
};


export const noRecordFoundMsg = (text, custom_class) => {
  return (
    <div style={{padding: "50px 0px 50px 0px", textAlign: "center"}} className= {custom_class}>{text}</div>
  );
};

export const  getImageOrVideoSrcFromPublicFolder =(name)=>{
  return `${process.env.PUBLIC_URL}/assets/images/${name}`
}

