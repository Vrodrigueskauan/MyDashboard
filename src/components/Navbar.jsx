

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart2,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  Search,
  X,
  Menu,
  ChevronRight,
} from "lucide-react";
import "./Navbar.css";

// ─── Dados de navegação ───────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Visão Geral",    icon: LayoutDashboard, href: "/home" },
  { label: "Analytics",   icon: BarChart2,        href: "/Analytics" },
  { label: "Investimentos",icon: TrendingUp,       href: "/investimentos" },
  { label: "Planejamentos",  icon: FileText,         href: "/planejamentos" },
  { label: "Projetos",icon: Settings,         href: "/projetos" },
];


const navbarVariants = {
  hidden:  { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Stagger dos itens do menu */
const menuContainerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.22 } },
};

const menuItemVariants = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

/** Sidebar mobile */
const sidebarVariants = {
  hidden:  { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

/** Overlay escuro por baixo da sidebar */
const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

/** Search expand */
const searchVariants = {
  collapsed: { width: 36, opacity: 0.6 },
  expanded:  { width: 200, opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Componente: Logo ─────────────────────────────────────────────────────────
function NavLogo() {
  return (
    <motion.a
      href="#"
      className="nav-logo"
      whileHover={{ opacity: 0.82 }}
      transition={{ duration: 0.15 }}
    >
      {/* Ícone geométrico minimalista — dois quadrados sobrepostos */}
      <span className="nav-logo__icon" aria-hidden="true">
        <img src="/logo.svg" alt="Logo" />
      </span>
      <span className="nav-logo__name">MyDashboard</span>
    </motion.a>
  );
}

// ─── Componente: Item do Menu (desktop) ───────────────────────────────────────
function NavItem({ item, isActive, onClick }) {
  return (
    <motion.li variants={menuItemVariants} className="nav-menu__item">
      <motion.a
        href={item.href}
        className={`nav-menu__link ${isActive ? "nav-menu__link--active" : ""}`}
        onClick={() => onClick(item.label)}
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <span className="nav-menu__label">{item.label}</span>

        {/* Linha branca que surge no hover / active */}
        <motion.span
          className="nav-menu__underline"
          variants={{
            rest:  { scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 },
            hover: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Brilho sutil no hover */}
        <motion.span
          className="nav-menu__glow"
          variants={{
            rest:  { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.a>
    </motion.li>
  );
}

// ─── Componente: Campo de Pesquisa ────────────────────────────────────────────
function NavSearch() {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef(null);

  // Foca o input ao expandir
  useEffect(() => {
    if (expanded && inputRef.current) inputRef.current.focus();
  }, [expanded]);

  return (
    <motion.div
      className="nav-search"
      variants={searchVariants}
      animate={expanded ? "expanded" : "collapsed"}
    >
      <button
        className="nav-search__icon-btn"
        onClick={() => setExpanded(v => !v)}
        aria-label="Buscar"
      >
        <Search size={15} strokeWidth={1.6} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.input
            key="search-input"
            ref={inputRef}
            type="text"
            placeholder="Buscar..."
            className="nav-search__input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.12 } }}
            exit={{ opacity: 0 }}
            onBlur={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Componente: Notificações ─────────────────────────────────────────────────
function NavBell() {
  return (
    <motion.button
      className="nav-icon-btn"
      aria-label="Notificações"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.15 }}
    >
      <Bell size={16} strokeWidth={1.6} />
      {/* Badge de notificação */}
      <span className="nav-bell__badge" aria-hidden="true" />
    </motion.button>
  );
}

// ─── Componente: Avatar ───────────────────────────────────────────────────────
function NavAvatar() {
  return (
    <motion.button
      className="nav-avatar"
      aria-label="Perfil do usuário"
      whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.3)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
    >
      {/* Iniciais como fallback; troque por <img> se tiver URL */}
      <span className="nav-avatar__initials">JD</span>
    </motion.button>
  );
}

// ─── Componente: Sidebar Mobile ───────────────────────────────────────────────
function NavSidebar({ isOpen, onClose, activeItem, onSelectItem }) {
  // Fecha ao pressionar Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="nav-sidebar__overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            key="sidebar"
            className="nav-sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            {/* Header da sidebar */}
            <div className="nav-sidebar__header">
              <NavLogo />
              <motion.button
                className="nav-icon-btn"
                onClick={onClose}
                aria-label="Fechar menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} strokeWidth={1.6} />
              </motion.button>
            </div>

            {/* Divisor */}
            <div className="nav-sidebar__divider" />

            {/* Itens de navegação */}
            <nav className="nav-sidebar__nav">
              <ul className="nav-sidebar__list">
                {NAV_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  const active = activeItem === item.label;
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.055, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        className={`nav-sidebar__link ${active ? "nav-sidebar__link--active" : ""}`}
                        onClick={() => { onSelectItem(item.label); onClose(); }}
                      >
                        <span className="nav-sidebar__link-icon">
                          <Icon size={15} strokeWidth={1.5} />
                        </span>
                        <span className="nav-sidebar__link-label">{item.label}</span>
                        <ChevronRight size={13} strokeWidth={1.4} className="nav-sidebar__chevron" />
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer da sidebar */}
            <div className="nav-sidebar__footer">
              <NavAvatar />
              <div className="nav-sidebar__user-info">
                <span className="nav-sidebar__user-name">John Doe</span>
                <span className="nav-sidebar__user-role">Admin</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Componente Principal: Navbar ─────────────────────────────────────────────
export default function Navbar() {
  const [activeItem, setActiveItem]   = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Bloqueia scroll quando a sidebar está aberta
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <>
      <motion.header
        className="navbar"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        role="banner"
      >
        <div className="navbar__inner">

          {/* ── Esquerda: Logo ──────────────────────────────────── */}
          <div className="navbar__left">
            <NavLogo />
          </div>

          {/* ── Centro: Menu (desktop) ──────────────────────────── */}
          <motion.nav
            className="navbar__center"
            aria-label="Navegação principal"
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <ul className="nav-menu">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  isActive={activeItem === item.label}
                  onClick={setActiveItem}
                />
              ))}
            </ul>
          </motion.nav>

          {/* ── Direita: Ações ──────────────────────────────────── */}
          <motion.div
            className="navbar__right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.4 } }}
          >
            <NavSearch />
            <NavBell />

            {/* Divisor vertical */}
            <span className="navbar__divider" aria-hidden="true" />

            <NavAvatar />
          </motion.div>

          {/* ── Hamburger (mobile) ──────────────────────────────── */}
          <motion.button
            className="nav-hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={sidebarOpen}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
          >
            <Menu size={18} strokeWidth={1.5} />
          </motion.button>

        </div>
      </motion.header>

      {/* ── Sidebar Mobile ──────────────────────────────────────── */}
      <NavSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeItem}
        onSelectItem={setActiveItem}
      />
    </>
  );
}