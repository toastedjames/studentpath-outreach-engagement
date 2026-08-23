import {
  Bell,
  Search,
  UserCircle,
} from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="header-search">
        <Search size={19} />

        <input
          type="text"
          placeholder="Search students, outreach, or tasks..."
        />
      </div>

      <div className="header-actions">
        <button className="header-icon-button">
          <Bell size={20} />
        </button>

        <div className="header-user">
          <UserCircle size={32} />

          <div>
            <strong>Somak Goswami</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;