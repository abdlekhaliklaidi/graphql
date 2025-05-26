import { Login } from "./form.js";
import { login } from "./login.js";
import { select } from "./jwt.js";

export function infouser(dataUser) {

  if (!dataUser || !dataUser.firstName || !dataUser.lastName) {
    console.warn("User data is missing.");
    const div = document.createElement("header");
    div.className = "user header";
    const name = document.createElement("span");
    name.className = "username";
    name.innerText = "There is nothing"; 
    div.append(name);
    select.append(div);
    return;
  }
  const div = document.createElement("header");
  div.className = "user header";
  const name = document.createElement("span");
  name.className = "username";
  const logOut = document.createElement("button");
  logOut.innerHTML = "Log Out";
  logOut.className = "log-out";
  name.innerText = `Welcome,  ${dataUser.firstName} ${dataUser.lastName}!`;
  div.append(name, logOut);
  select.append(div);
  logOut.addEventListener("click", () => {
    localStorage.removeItem("jwt-token");
    select.innerHTML = Login;
    login();
  });
}

export function Skillsuser(skills) {

  if (!Array.isArray(skills) || skills.length === 0) {
    console.warn('Skills data is missing or not in the expected format.');
    const divSkills = document.createElement("div");
    divSkills.className = "card skills";
    const text = document.createElement("div");
    text.className = "titleRatio titleSkills";
    text.innerText = "Skills: There is nothing";  
    divSkills.append(text);
    return divSkills;
  }

  const divSkills = document.createElement("div");
  divSkills.className = "card skills";

  const text = document.createElement("div");
  text.className = "titleRatio titleSkills";
  text.innerText = "Skills";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");
  svg.setAttribute("viewBox", "0 0 200 200");
  svg.setAttribute("class", "skills-svg");

  let total = 0;
  skills.forEach(skill => {
    total += skill.amount;
  });

  let currentAngle = 0;
  let centerX = 80, centerY = 100, radius = 135

  skills.forEach(skill => {
    // const skillAngle = (skill.amount / total) * 400;
    const skillAngle = (skill.amount / total) * 385;


    const x1 = 100 + 100 * Math.cos((currentAngle * Math.PI) / 80);
    const y1 = 100 + 100 * Math.sin((currentAngle * Math.PI) / 80);
    const x2 = 100 + 100 * Math.cos(((currentAngle + skillAngle) * Math.PI) / 80);
    const y2 = 100 + 100 * Math.sin(((currentAngle + skillAngle) * Math.PI) / 80);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M 100 100 L ${x1} ${y1} A 100 100 0 ${skillAngle > 80 ? 1 : 0} 1 ${x2} ${y2} Z`);
    path.setAttribute("fill", getRandomColor()); // Random color for each skill

    svg.appendChild(path);

    const percentText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const labelAngle = currentAngle + skillAngle / 2;
    percentText.setAttribute("x", centerX + (radius / 2) * Math.cos((labelAngle * Math.PI) / 80));
    percentText.setAttribute("y", centerY + (radius / 2) * Math.sin((labelAngle * Math.PI) / 80));
    // percentText.setAttribute("text-anchor", "middle");
    percentText.setAttribute("dy", "0.3em");
    percentText.setAttribute("fill", "white");
    percentText.setAttribute("font-size", "10px");
    percentText.textContent = skill.type;

    svg.appendChild(percentText);

    currentAngle += skillAngle;
  });

  divSkills.append(text, svg);

  return divSkills;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


export function Info(info) {

  if (!info || !info.transactions || !info.totalXp || !Array.isArray(info.skills)) {
    console.warn("Info data is missing or incomplete.");
    const divskill = document.createElement("div");
    divskill.className = "rows";
    const divlevel = document.createElement("div");
    divlevel.className = "info";
    divlevel.innerText = "There is nothing";  
    divskill.append(divlevel);
    select.append(divskill);
    return;
  }

  const divskill = document.createElement("div");
  divskill.className = "rows";
  // const divlevel = Liveruser(info.transactions[0].amount);
  const divlevel = info.transactions.length > 0 ? Liveruser(info.transactions[0].amount) : null;
  const divXp = Xpuser(info.totalXp.aggregate.sum.amount);
  const skillsDiv = Skillsuser(info.skills);
  divskill.append(divXp, divlevel, skillsDiv);
  select.append(divskill);
}

function Liveruser(level) {

  if (!level) {
    console.warn("Level data is missing.");
    return;
  }
  const divAutdit = document.createElement("div");
  divAutdit.className = "card";
  const divlevel = document.createElement("div");
  divlevel.className = "user-level";
  const text = document.createElement("div");
  text.innerText = "Your Level";
  text.className = "titleRatio titlelevel";
  const levele = document.createElement("div");
  levele.innerText = level;
  levele.className = "level";
  divlevel.append(text, levele);
  divAutdit.append(divlevel);
  return divAutdit;
}

export function creatPath(trans) {

  if (!trans || trans.length === 0) {
    console.warn("Transaction data is missing.");
    const div = document.createElement("div");
    div.className = "card path";
    const message = document.createElement("div");
    message.className = "message";
    message.innerText = "There is nothing";  
    div.append(message);
    return div;
  }
  let cumulativeXP = 0;
  const width = 680;
  const height = 303;
  const div = document.createElement("div");
  div.className = "card path";
  const dataPoints = trans.map((transaction) => {
    cumulativeXP += transaction.amount;
    return {
      date: new Date(transaction.createdAt),
      name: transaction.object.name,
      xp: cumulativeXP,
    };
  });

  if (dataPoints.length === 0) return;

  const endTime = dataPoints[dataPoints.length - 1].date;
  const startTime = dataPoints[0].date;
  const maxXP = dataPoints[dataPoints.length - 1].xp;

  const pathData = dataPoints
    .map((point, index) => {
      const x = scaleX(point.date, endTime, startTime, width);
      const y = scaleY(point.xp, maxXP, height);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "#9013fe");
  path.setAttribute("fill", "transparent");
  path.setAttribute("stroke-width", "3");

  svg.setAttribute("width", "90%");
  svg.setAttribute("height", "90%");
  svg.setAttribute("viewBox", `-17 -90 ${width + 50} ${height + 100}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.append(path);
  dataPoints.forEach((point) => {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    const x = scaleX(point.date, endTime, startTime, width);
    const y = scaleY(point.xp, maxXP, height);

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", "#ffff");
    circle.addEventListener("mouseenter", (e) => {
      const div = document.createElement("div");
      div.className = "hover";
      div.style.left = `${e.pageX + 10}px`;
      div.style.top = `${e.pageY - 10}px`;
      div.innerHTML = `
        Name : ${point.name}<br>
        Total XP : ${formatSize(point.xp)}
      `;
      circle.setAttribute("r", "8");
      circle.addEventListener("mouseleave", () => {
        div.remove();
        circle.setAttribute("r", "5");
      });
      document.body.append(div);
    });
    svg.append(circle);
  });
  div.append(svg);
  return div;
}

export function Nextgrades(data) {
  const div = document.createElement("div");
  div.className = "next";
  const divpath = creatPath(data.transaction);
  div.append(divpath);
  select.append(div);
}

function scaleX(date, endDate, startDate, width) {
  const timeRange = endDate - startDate;
  const timePosition = date - startDate;
  return (timePosition / timeRange) * width;
}

function scaleY(xp, maxXP, height) {
  return height - (xp / maxXP) * height;
}

function Xpuser(xp) {

  if (!xp) {
    console.warn("XP data is missing.");
    return;
  }
  const divAutdit = document.createElement("div");
  divAutdit.className = "card";
  const divlevel = document.createElement("div");
  divlevel.className = "user-xp";
  const text = document.createElement("div");
  text.innerText = "XP Board";
  text.className = "titleRatio titlelevel";

  // Create a progress bar element
  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";

  const progressBar = document.createElement("progress");
  progressBar.className = "progress-bar";
  progressBar.setAttribute("max", 100);
  progressBar.setAttribute("value", xp);

  const span = document.createElement("span");
  span.innerHTML = "Total XP: " + formatSize(xp);
  span.style.fontSize = "1rem";

  // Append elements
  divlevel.append(text, progressContainer);
  progressContainer.append(progressBar, span);
  divAutdit.append(divlevel);
  return divAutdit;
}


export function formatSize(value) {
  if (value < 1000) {
    return `${value}B`;
  } else if (value >= 1000 && value < 1000000) {
    return `${(value / 1000).toFixed(2)}KB`;
  } else {
    return `${(value / 1000000).toFixed(2)}MB`;
  }
}
