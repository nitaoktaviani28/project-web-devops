// ============================================
// Meal Planner - Full CRUD + LocalStorage
// ============================================

const DEFAULT_DATA = {
  Senin: [
    { id: "s1", time: "07:00", type: "breakfast", name: "Nasi Uduk Komplit", desc: "Nasi uduk, ayam goreng serundeng, telur balado, sambal kacang, kerupuk", cal: 520 },
    { id: "s2", time: "12:30", type: "lunch", name: "Soto Betawi", desc: "Soto santan daging sapi, kentang, tomat, daun bawang, emping", cal: 480 },
    { id: "s3", time: "15:30", type: "snack", name: "Risoles Mayo", desc: "Risoles isi ragout sayuran dengan saus mayonaise, 2 buah", cal: 210 },
    { id: "s4", time: "19:00", type: "dinner", name: "Ikan Bakar Jimbaran", desc: "Ikan kakap bakar bumbu Bali, plecing kangkung, nasi putih, sambal matah", cal: 450 }
  ],
  Selasa: [
    { id: "t1", time: "06:45", type: "breakfast", name: "Bubur Ayam Cirebon", desc: "Bubur nasi lembut, ayam suwir, cakwe, kacang tanah, kerupuk, kecap", cal: 380 },
    { id: "t2", time: "12:00", type: "lunch", name: "Rendang Sapi", desc: "Rendang daging sapi Padang, nasi putih, sayur singkong, sambal hijau", cal: 620 },
    { id: "t3", time: "15:00", type: "snack", name: "Es Cendol Dawet", desc: "Cendol pandan, santan, gula merah cair, es serut", cal: 180 },
    { id: "t4", time: "19:30", type: "dinner", name: "Cap Cay Goreng", desc: "Tumis sayuran campur, bakso, udang, saus tiram, nasi putih hangat", cal: 410 }
  ],
  Rabu: [
    { id: "r1", time: "07:15", type: "breakfast", name: "Lontong Sayur", desc: "Lontong, sayur labu siam santan, sambal goreng ati, telur pindang", cal: 460 },
    { id: "r2", time: "12:15", type: "lunch", name: "Ayam Geprek Sambal Bawang", desc: "Ayam goreng tepung geprek, sambal bawang pedas, nasi, lalapan timun", cal: 550 },
    { id: "r3", time: "16:00", type: "snack", name: "Pisang Goreng Keju", desc: "Pisang raja goreng crispy tabur keju parmesan dan susu kental manis", cal: 250 },
    { id: "r4", time: "19:00", type: "dinner", name: "Rawon Surabaya", desc: "Rawon daging sapi kluwek, tauge, telur asin, nasi putih, sambal terasi", cal: 470 }
  ],
  Kamis: [
    { id: "k1", time: "07:00", type: "breakfast", name: "Nasi Goreng Kampung", desc: "Nasi goreng kecap, telur mata sapi, ayam suwir, acar mentimun, kerupuk", cal: 490 },
    { id: "k2", time: "12:30", type: "lunch", name: "Gulai Tunjang", desc: "Gulai tunjang sapi khas Padang, nasi putih, daun singkong rebus, sambal lado", cal: 580 },
    { id: "k3", time: "15:30", type: "snack", name: "Tahu Crispy Saus Mentai", desc: "Tahu sumedang goreng garing dengan saus mentai dan nori tabur", cal: 220 },
    { id: "k4", time: "19:15", type: "dinner", name: "Mie Ayam Bakso", desc: "Mie ayam pangsit, bakso sapi urat, sawi hijau, kuah kaldu", cal: 430 }
  ],
  Jumat: [
    { id: "j1", time: "06:30", type: "breakfast", name: "Ketupat Sayur Padang", desc: "Ketupat, sayur nangka santan, rendang telur, kerupuk kulit", cal: 510 },
    { id: "j2", time: "12:00", type: "lunch", name: "Nasi Liwet Solo", desc: "Nasi liwet santan, ayam suwir, telur pindang, sayur labu, sambal goreng", cal: 540 },
    { id: "j3", time: "15:00", type: "snack", name: "Kue Lapis Legit", desc: "Lapis legit premium 2 potong, teh tawar hangat", cal: 310 },
    { id: "j4", time: "19:00", type: "dinner", name: "Pecel Lele Lamongan", desc: "Lele goreng tepung, sambal terasi korek, lalapan, nasi putih, tahu goreng", cal: 460 }
  ],
  Sabtu: [
    { id: "sa1", time: "08:00", type: "breakfast", name: "Roti Bakar Bandung", desc: "Roti bakar selai srikaya, cokelat, keju, mentega, teh tarik hangat", cal: 350 },
    { id: "sa2", time: "12:30", type: "lunch", name: "Sate Ayam Madura", desc: "Sate ayam 10 tusuk, bumbu kacang, lontong, acar bawang merah", cal: 500 },
    { id: "sa3", time: "16:00", type: "snack", name: "Siomay Bandung", desc: "Siomay ikan tenggiri, tahu, kentang, kol, telur, bumbu kacang, kecap, jeruk limau", cal: 280 },
    { id: "sa4", time: "19:30", type: "dinner", name: "Nasi Bakar Ayam Kemangi", desc: "Nasi bakar daun pisang isi ayam suwir kemangi pedas, sambal korek", cal: 440 }
  ],
  Minggu: [
    { id: "m1", time: "08:30", type: "breakfast", name: "Nasi Kuning Tumpeng Mini", desc: "Nasi kuning, ayam goreng lengkuas, perkedel kentang, urap sayuran, sambal goreng tempe", cal: 560 },
    { id: "m2", time: "12:00", type: "lunch", name: "Bebek Goreng Madura", desc: "Bebek goreng rempah, sambal korek bawang, lalapan, nasi putih hangat", cal: 590 },
    { id: "m3", time: "15:30", type: "snack", name: "Klepon dan Onde-Onde", desc: "Klepon isi gula merah 4 buah, onde-onde wijen 3 buah, teh melati", cal: 270 },
    { id: "m4", time: "19:00", type: "dinner", name: "Sop Buntut Goreng", desc: "Buntut sapi goreng berkuah bening, wortel, kentang, buncis, nasi putih", cal: 520 }
  ]
};

// Referensi kalori makanan Indonesia (per porsi)
const CALORIE_REF = {
  "Nasi & Karbohidrat": [
    { name: "Nasi putih (1 piring)", cal: 200 },
    { name: "Nasi goreng", cal: 450 },
    { name: "Nasi uduk", cal: 300 },
    { name: "Nasi kuning", cal: 320 },
    { name: "Lontong (2 potong)", cal: 150 },
    { name: "Ketupat (2 potong)", cal: 160 },
    { name: "Mie goreng", cal: 400 },
    { name: "Mie ayam", cal: 430 },
    { name: "Bubur ayam", cal: 350 },
    { name: "Nasi liwet", cal: 380 }
  ],
  "Lauk Ayam": [
    { name: "Ayam goreng (1 potong)", cal: 250 },
    { name: "Ayam bakar (1 potong)", cal: 220 },
    { name: "Ayam geprek", cal: 350 },
    { name: "Sate ayam (10 tusuk)", cal: 300 },
    { name: "Ayam penyet", cal: 280 },
    { name: "Opor ayam (1 potong)", cal: 300 }
  ],
  "Lauk Daging & Kambing": [
    { name: "Rendang sapi", cal: 400 },
    { name: "Soto betawi", cal: 450 },
    { name: "Rawon", cal: 380 },
    { name: "Gulai kambing", cal: 420 },
    { name: "Sop buntut", cal: 350 },
    { name: "Empal daging", cal: 300 },
    { name: "Bakso (1 mangkuk)", cal: 300 }
  ],
  "Lauk Ikan & Seafood": [
    { name: "Ikan bakar (1 ekor sedang)", cal: 250 },
    { name: "Ikan goreng (1 ekor sedang)", cal: 280 },
    { name: "Udang goreng tepung", cal: 250 },
    { name: "Cumi goreng tepung", cal: 270 },
    { name: "Pecel lele (1 ekor)", cal: 300 },
    { name: "Pindang ikan", cal: 200 }
  ],
  "Lauk Telur & Tahu Tempe": [
    { name: "Telur goreng / ceplok", cal: 120 },
    { name: "Telur balado (2 butir)", cal: 200 },
    { name: "Telur dadar", cal: 150 },
    { name: "Tahu goreng (3 potong)", cal: 150 },
    { name: "Tempe goreng (3 potong)", cal: 170 },
    { name: "Perkedel kentang (2 buah)", cal: 200 }
  ],
  "Sayur & Sup": [
    { name: "Sayur asem", cal: 80 },
    { name: "Sayur lodeh", cal: 150 },
    { name: "Sayur sop", cal: 70 },
    { name: "Urap sayuran", cal: 120 },
    { name: "Gado-gado", cal: 350 },
    { name: "Cap cay", cal: 200 },
    { name: "Kangkung tumis", cal: 100 },
    { name: "Lalapan + sambal", cal: 50 }
  ],
  "Snack & Gorengan": [
    { name: "Risoles (2 buah)", cal: 210 },
    { name: "Siomay Bandung", cal: 280 },
    { name: "Batagor", cal: 300 },
    { name: "Pisang goreng (2 buah)", cal: 200 },
    { name: "Tahu isi (3 buah)", cal: 220 },
    { name: "Kue lapis (2 potong)", cal: 250 },
    { name: "Klepon (4 buah)", cal: 180 },
    { name: "Onde-onde (3 buah)", cal: 210 },
    { name: "Lemper (2 buah)", cal: 220 },
    { name: "Martabak manis (2 potong)", cal: 350 }
  ],
  "Minuman": [
    { name: "Teh manis", cal: 80 },
    { name: "Kopi susu", cal: 120 },
    { name: "Es cendol/dawet", cal: 180 },
    { name: "Es teler", cal: 250 },
    { name: "Jus alpukat", cal: 200 },
    { name: "Es jeruk", cal: 90 },
    { name: "Teh tarik", cal: 130 },
    { name: "Air putih", cal: 0 }
  ],
  "Makanan Barat & Lainnya": [
    { name: "Roti bakar (2 lembar)", cal: 250 },
    { name: "Sandwich", cal: 300 },
    { name: "Indomie goreng", cal: 380 },
    { name: "Indomie kuah", cal: 330 },
    { name: "Pizza (1 slice)", cal: 270 },
    { name: "Burger", cal: 400 },
    { name: "Kentang goreng (medium)", cal: 350 }
  ]
};

const DAYS_ORDER = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const JS_DAY_MAP = { 0: "Minggu", 1: "Senin", 2: "Selasa", 3: "Rabu", 4: "Kamis", 5: "Jumat", 6: "Sabtu" };
const TYPE_LABELS = { breakfast: "Pagi", lunch: "Siang", snack: "Sore", dinner: "Malam" };

let mealData = {};
let currentDay = "";

// --- Storage ---
function loadData() {
  const saved = localStorage.getItem("mealPlannerData");
  if (saved) {
    try { mealData = JSON.parse(saved); } catch { mealData = structuredClone(DEFAULT_DATA); }
  } else {
    mealData = structuredClone(DEFAULT_DATA);
  }
  DAYS_ORDER.forEach(d => { if (!mealData[d]) mealData[d] = []; });
}

function saveData() {
  localStorage.setItem("mealPlannerData", JSON.stringify(mealData));
}

function genId() {
  return "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// --- Clock ---
function updateClock() {
  const now = new Date();
  const wib = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  const h = String(wib.getHours()).padStart(2, "0");
  const m = String(wib.getMinutes()).padStart(2, "0");
  const s = String(wib.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent = h + ":" + m + ":" + s + " WIB";
}

function getTodayName() {
  return JS_DAY_MAP[new Date().getDay()] || "Senin";
}

// --- Render ---
function renderTabs() {
  const container = document.getElementById("dayTabs");
  const today = getTodayName();
  container.innerHTML = DAYS_ORDER.map(day => {
    const cls = [(day === currentDay ? "active" : ""), (day === today ? "today" : "")].join(" ").trim();
    return '<button class="day-tab ' + cls + '" onclick="selectDay(\'' + day + '\')">' + day + '</button>';
  }).join("");
}

function renderSchedule(day) {
  const container = document.getElementById("scheduleContainer");
  const empty = document.getElementById("emptyState");
  const meals = (mealData[day] || []).sort((a, b) => a.time.localeCompare(b.time));

  if (meals.length === 0) {
    container.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";
  container.innerHTML = meals.map((meal, i) => {
    const label = TYPE_LABELS[meal.type] || meal.type;
    return '<div class="meal-card" style="animation-delay:' + (i * 0.08) + 's">' +
      '<div class="meal-time"><div class="time">' + escHtml(meal.time) + '</div><div class="period">WIB</div></div>' +
      '<div class="meal-info"><h3>' + escHtml(meal.name) + '</h3><p class="description">' + escHtml(meal.desc || "") + '</p></div>' +
      '<div class="meal-meta"><span class="meal-tag ' + meal.type + '">' + label + '</span><span class="calories">' + meal.cal + ' kcal</span></div>' +
      '<div class="meal-actions">' +
        '<button class="btn-edit" onclick="editMeal(\'' + day + '\',\'' + meal.id + '\')" title="Edit">&#9998;</button>' +
        '<button class="btn-del" onclick="deleteMeal(\'' + day + '\',\'' + meal.id + '\')" title="Hapus">&times;</button>' +
      '</div></div>';
  }).join("");
}

function renderOverview() {
  const container = document.getElementById("overviewGrid");
  container.innerHTML = DAYS_ORDER.map(day => {
    const meals = mealData[day] || [];
    const totalCal = meals.reduce((s, m) => s + (m.cal || 0), 0);
    const isActive = day === currentDay ? "active" : "";
    return '<div class="overview-card ' + isActive + '" onclick="selectDay(\'' + day + '\')">' +
      '<div class="day-name">' + day.substring(0, 3) + '</div>' +
      '<div class="meal-count">' + meals.length + '</div>' +
      '<div class="meal-count-label">' + totalCal + ' kcal</div></div>';
  }).join("");
}

function updateStats() {
  const today = getTodayName();
  const todayMeals = mealData[today] || [];
  const totalMeals = Object.values(mealData).flat().length;
  const todayCal = todayMeals.reduce((s, m) => s + (m.cal || 0), 0);

  document.getElementById("totalMeals").textContent = totalMeals;
  document.getElementById("todayCalories").textContent = todayCal;
  document.getElementById("currentDay").textContent = currentDay;

  const now = new Date();
  const wib = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  const currentMinutes = wib.getHours() * 60 + wib.getMinutes();

  let nextMeal = "--";
  const sorted = [...todayMeals].sort((a, b) => a.time.localeCompare(b.time));
  for (const meal of sorted) {
    const [h, m] = meal.time.split(":").map(Number);
    if (h * 60 + m > currentMinutes) { nextMeal = meal.time; break; }
  }
  document.getElementById("nextMeal").textContent = nextMeal;
}

function selectDay(day) {
  currentDay = day;
  renderTabs();
  renderSchedule(day);
  renderOverview();
  updateStats();
}

// --- CRUD ---
function toggleForm() {
  const panel = document.getElementById("formPanel");
  const overlay = document.getElementById("formOverlay");
  const isOpen = panel.classList.contains("show");
  if (isOpen) {
    panel.classList.remove("show");
    overlay.classList.remove("show");
    document.getElementById("mealForm").reset();
    document.getElementById("fEditId").value = "";
    document.getElementById("formTitle").textContent = "Tambah Meal";
  } else {
    document.getElementById("fDay").value = currentDay;
    panel.classList.add("show");
    overlay.classList.add("show");
  }
}

function saveMeal(e) {
  e.preventDefault();
  const day = document.getElementById("fDay").value;
  const editId = document.getElementById("fEditId").value;
  const meal = {
    id: editId || genId(),
    time: document.getElementById("fTime").value,
    type: document.getElementById("fType").value,
    name: document.getElementById("fName").value.trim(),
    desc: document.getElementById("fDesc").value.trim(),
    cal: parseInt(document.getElementById("fCal").value, 10) || 0
  };

  if (!mealData[day]) mealData[day] = [];

  if (editId) {
    // If editing and day changed, remove from old day
    for (const d of DAYS_ORDER) {
      const idx = mealData[d].findIndex(m => m.id === editId);
      if (idx !== -1) { mealData[d].splice(idx, 1); break; }
    }
  }

  mealData[day].push(meal);
  saveData();
  toggleForm();
  selectDay(day);
}

function editMeal(day, id) {
  const meal = (mealData[day] || []).find(m => m.id === id);
  if (!meal) return;

  document.getElementById("fEditId").value = meal.id;
  document.getElementById("fDay").value = day;
  document.getElementById("fTime").value = meal.time;
  document.getElementById("fType").value = meal.type;
  document.getElementById("fName").value = meal.name;
  document.getElementById("fDesc").value = meal.desc || "";
  document.getElementById("fCal").value = meal.cal;
  document.getElementById("formTitle").textContent = "Edit Meal";

  document.getElementById("formPanel").classList.add("show");
  document.getElementById("formOverlay").classList.add("show");
}

function deleteMeal(day, id) {
  if (!confirm("Hapus meal ini?")) return;
  mealData[day] = (mealData[day] || []).filter(m => m.id !== id);
  saveData();
  selectDay(day);
}

function clearDay() {
  if (!confirm("Hapus semua meal untuk " + currentDay + "?")) return;
  mealData[currentDay] = [];
  saveData();
  selectDay(currentDay);
}

function resetAll() {
  if (!confirm("Reset semua data ke default? Data yang kamu input akan hilang.")) return;
  mealData = structuredClone(DEFAULT_DATA);
  saveData();
  selectDay(currentDay);
}

// --- Calorie Reference ---
function toggleCalRef() {
  const panel = document.getElementById("refPanel");
  const overlay = document.getElementById("refOverlay");
  panel.classList.toggle("show");
  overlay.classList.toggle("show");
  if (panel.classList.contains("show")) renderCalRef();
}

function renderCalRef(filter) {
  const container = document.getElementById("refList");
  const q = (filter || "").toLowerCase();
  let html = "";

  for (const [cat, items] of Object.entries(CALORIE_REF)) {
    const filtered = q ? items.filter(it => it.name.toLowerCase().includes(q)) : items;
    if (filtered.length === 0) continue;
    html += '<div class="ref-category">' + escHtml(cat) + '</div>';
    html += filtered.map(it =>
      '<div class="ref-item" onclick="fillCalorie(' + it.cal + ',\'' + escAttr(it.name) + '\')">' +
        '<span class="ref-name">' + escHtml(it.name) + '</span>' +
        '<span class="ref-cal">' + it.cal + ' kcal</span>' +
      '</div>'
    ).join("");
  }

  container.innerHTML = html || '<p style="text-align:center;color:var(--text-muted);padding:1rem">Tidak ditemukan</p>';
}

function filterRef() {
  renderCalRef(document.getElementById("refSearch").value);
}

function fillCalorie(cal, name) {
  // If form is open, fill the calorie field
  const formPanel = document.getElementById("formPanel");
  if (formPanel.classList.contains("show")) {
    document.getElementById("fCal").value = cal;
    if (!document.getElementById("fName").value) {
      document.getElementById("fName").value = name;
    }
  }
  toggleCalRef();
}

// --- Import / Export ---
function exportData() {
  const blob = new Blob([JSON.stringify(mealData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meal-planner-data.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (ev) {
    try {
      const data = JSON.parse(ev.target.result);
      if (typeof data !== "object") throw new Error("Invalid");
      mealData = data;
      DAYS_ORDER.forEach(d => { if (!mealData[d]) mealData[d] = []; });
      saveData();
      selectDay(currentDay);
      alert("Data berhasil diimport!");
    } catch {
      alert("File JSON tidak valid.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

// --- Helpers ---
function escHtml(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function escAttr(s) {
  return s.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  currentDay = getTodayName();
  selectDay(currentDay);
  updateClock();
  setInterval(updateClock, 1000);
});
