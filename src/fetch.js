import { select } from "./jwt.js";
import { query } from "./query.js";
import { Info, infouser, Skillsuser, Nextgrades} from "./data.js";

export async function DataSowh(jwt) {
  document.head.querySelector("title").innerText = "Home"
  select.innerHTML = "";
  select.style.alignItems = "";
  const respons = await fetch(
    "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );
  const data = await respons.json();
  
  if (data.errors) {
    localStorage.removeItem("jwt-token");
    window.location.reload();
  }
  infouser(data.data.user[0]);
  Info(data.data.user[0]);
  // console.log(data);
  // console.log(data);
  
  if (data.data.skills) {
  Skillsuser(data.data.skills);
  console.log(showSkills);
  
  } 
  Nextgrades(data.data);
}
