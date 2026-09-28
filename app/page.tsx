 "use client";

import { useEffect, useMemo, useRef, useState } from "react";

const members = ["SUNGHО", "RIWOO", "JAEHYUN", "TAESAN", "LEEHAN", "WOONHAK"];

function makeId(name: string) {
  const clean = name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 8) || "ONEDOOR";
  const num = Math.floor(1000 + Math.random() * 9000);
  return `BND-${clean}-${num}`;
}

export default function Home() {
  const [name, setName] = useState("VIA");
  const [member, setMember] = useState("TAESAN");
  const [birthday, setBirthday] = useState("");
  const [favoriteSong, setFavoriteSong] = useState("Earth, Wind & Fire");
  const [color, setColor] = useState("#dcecff");
  const [id, setId] = useState("BND-VIA-2026");
  const [photo, setPhoto] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bnd-fan-id");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setName(data.name ?? "VIA");
        setMember(data.member ?? "TAESAN");
        setBirthday(data.birthday ?? "");
        setFavoriteSong(data.favoriteSong ?? "Earth, Wind & Fire");
        setColor(data.color ?? "#dcecff");
        setId(data.id ?? "BND-VIA-2026");
        setPhoto(data.photo ?? "");
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bnd-fan-id", JSON.stringify({ name, member, birthday, favoriteSong, color, id, photo }));
  }, [name, member, birthday, favoriteSong, color, id, photo]);

  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return (parts[0]?.[0] || "O") + (parts[1]?.[0] || "");
  }, [name]);

  function handlePhoto(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 4 * 1024 * 1024) {
      alert("Please choose an image smaller than 4 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  }

  function downloadCard() {
    if (!cardRef.current) return;
    alert("Your ID is ready! For the cleanest image export, use your browser's screenshot/save feature. A future version can add PNG export with html-to-image.");
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand">BND <span>FAN ID MAKER</span></div>
        <div className="tiny">FANMADE • NOT OFFICIAL</div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">WHO’S NEXT?</p>
          <h1>Make your own<br/><span>BOYNEXTDOOR</span> ID.</h1>
          <p className="subtitle">Customize a cute digital fan ID with your name, favorite member, song, photo and colors.</p>
        </div>
        <div className="sticker">ONEDOOR<br/><b>✦</b></div>
      </section>

      <section className="workspace">
        <div className="panel">
          <div className="panelTitle">CUSTOMIZE</div>

          <label>Name / Nickname
            <input value={name} maxLength={20} onChange={e => setName(e.target.value)} placeholder="Your name"/>
          </label>

          <label>Favorite member
            <select value={member} onChange={e => setMember(e.target.value)}>
              {members.map(m => <option key={m}>{m}</option>)}
            </select>
          </label>

          <label>Birthday
            <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
          </label>

          <label>Favorite song
            <input value={favoriteSong} maxLength={30} onChange={e => setFavoriteSong(e.target.value)} placeholder="Favorite song"/>
          </label>

          <label>Card color
            <div className="colorRow">
              <input className="color" type="color" value={color} onChange={e => setColor(e.target.value)}/>
              <span>{color.toUpperCase()}</span>
            </div>
          </label>

          <label>Profile photo
            <input type="file" accept="image/*" onChange={e => handlePhoto(e.target.files?.[0])}/>
          </label>

          <button className="generate" onClick={() => setId(makeId(name))}>GENERATE NEW ID ↗</button>
          <button className="secondary" onClick={downloadCard}>SAVE / EXPORT</button>
        </div>

        <div className="previewWrap">
          <div className="previewLabel">LIVE PREVIEW</div>
          <div ref={cardRef} className="idCard" style={{ background: color }}>
            <div className="cardTop">
              <span>BOYNEXTDOOR</span>
              <span>ONEDOOR</span>
            </div>

            <div className="photo">
              {photo ? <img src={photo} alt="Fan profile"/> : <span>{initials.toUpperCase()}</span>}
            </div>

            <div className="cardName">{name || "YOUR NAME"}</div>
            <div className="role">FAN ID • {member}</div>

            <div className="info">
              <div><small>ID NUMBER</small><b>{id}</b></div>
              <div><small>BIRTHDAY</small><b>{birthday || "—"}</b></div>
              <div><small>FAVORITE SONG</small><b>{favoriteSong || "—"}</b></div>
            </div>

            <div className="barcode"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
            <div className="officialNotice">FANMADE DIGITAL ID • NOT AN OFFICIAL MEMBERSHIP CARD</div>
          </div>
          <p className="hint">Tip: your details are saved in this browser only. No account or database is required.</p>
        </div>
      </section>

      <footer>Made for ONEDOOR ♡ • BOYNEXTDOOR-inspired fan project</footer>
    </main>
  );
}