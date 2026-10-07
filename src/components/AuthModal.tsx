import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, UserOrder } from '../types';
import { Logo } from './brand/Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  orders?: UserOrder[];
  onNavigateToCatalog?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  orders = [],
  onNavigateToCatalog
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [accountTab, setAccountTab] = useState<'profile' | 'orders'>('profile');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptNewsletter, setAcceptNewsletter] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setErrorMsg('Por favor, ingresa tu nombre completo.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Las contraseñas no coinciden.');
        return;
      }

      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        joinDate: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
      };

      onLogin(newUser);
      setSuccessMsg('¡Registro completado con éxito! Bienvenido a la familia Rin no mori 🌿');
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      // Login mode
      const existingUser: User = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0] || 'Cliente',
        email: email.trim().toLowerCase(),
        joinDate: 'Miembro Rin no mori'
      };

      onLogin(existingUser);
      setSuccessMsg('¡Sesión iniciada con éxito!');
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En preparación':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300/60 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>En preparación</span>
          </span>
        );
      case 'En camino':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-300/60 shadow-2xs">
            <span className="material-symbols-outlined text-xs">local_shipping</span>
            <span>En camino</span>
          </span>
        );
      case 'Entregado':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#dbea9e]/80 text-[#3b4515] border border-[#586427]/30 shadow-2xs">
            <span className="material-symbols-outlined text-xs">check_circle</span>
            <span>Entregado</span>
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="auth-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-[#1e1b18]/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div 
            key="auth-modal-card"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="bg-[#fff8f5] max-w-lg w-full rounded-3xl p-6 md:p-8 border border-[#827470]/15 shadow-2xl relative space-y-5 overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[#827470] hover:text-[#442a22] p-1.5 rounded-full hover:bg-[#fbf2ed] transition-colors focus:outline-none z-10"
              title="Cerrar"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Header Mascot Logo */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto flex items-center justify-center p-1 rounded-full bg-[#fbf2ed] border border-[#827470]/15 shadow-2xs">
                <Logo size="100%" variant="icon-only" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-[#442a22]">
                  {currentUser ? 'Mi Cuenta' : mode === 'register' ? 'Crear una Cuenta' : 'Iniciar Sesión'}
                </h3>
                <p className="text-xs text-[#586427] font-semibold tracking-wider uppercase mt-0.5">
                  Rin no mori ・ Bosque de dulzura
                </p>
              </div>
            </div>

            {/* IF USER IS ALREADY LOGGED IN */}
            {currentUser ? (
              <div className="space-y-5">
                
                {/* Account Navigation Tabs */}
                <div className="grid grid-cols-2 p-1 bg-[#fbf2ed] rounded-2xl border border-[#827470]/15">
                  <button
                    type="button"
                    onClick={() => setAccountTab('profile')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      accountTab === 'profile'
                        ? 'bg-[#586427] text-white shadow-2xs'
                        : 'text-[#504441] hover:text-[#442a22]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">person</span>
                    <span>Mi Perfil</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountTab('orders')}
                    className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      accountTab === 'orders'
                        ? 'bg-[#586427] text-white shadow-2xs'
                        : 'text-[#504441] hover:text-[#442a22]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">shopping_bag</span>
                    <span>Mis Pedidos</span>
                    {orders.length > 0 && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                        accountTab === 'orders' ? 'bg-white text-[#586427]' : 'bg-[#586427] text-white'
                      }`}>
                        {orders.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* TAB 1: PROFILE */}
                {accountTab === 'profile' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="bg-[#fbf2ed] p-4 rounded-2xl border border-[#827470]/12 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#586427] text-white font-bold flex items-center justify-center text-lg shadow-xs">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-base text-[#442a22]">{currentUser.name}</h4>
                          <p className="text-xs text-[#827470]">{currentUser.email}</p>
                        </div>
                      </div>
                      {currentUser.phone && (
                        <div className="text-xs text-[#504441] flex items-center gap-1.5 pt-2 border-t border-[#827470]/10">
                          <span className="material-symbols-outlined text-sm text-[#586427]">phone</span>
                          <span>{currentUser.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="bg-white p-3.5 rounded-xl border border-[#827470]/10 flex items-center justify-between">
                        <span className="text-[#504441] font-semibold">Miembro desde:</span>
                        <span className="font-bold text-[#442a22]">{currentUser.joinDate || '2026'}</span>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-[#827470]/10 flex items-center justify-between">
                        <span className="text-[#504441] font-semibold">Beneficios de membresía:</span>
                        <span className="font-bold text-[#586427] bg-[#dbea9e]/50 px-2.5 py-0.5 rounded-full text-[10px]">
                          Cliente Frecuente 🌿
                        </span>
                      </div>
                      <div className="bg-white p-3.5 rounded-xl border border-[#827470]/10 flex items-center justify-between">
                        <span className="text-[#504441] font-semibold">Historial de pedidos:</span>
                        <button
                          onClick={() => setAccountTab('orders')}
                          className="font-bold text-[#586427] hover:underline flex items-center gap-1"
                        >
                          <span>{orders.length} pedido(s)</span>
                          <span className="material-symbols-outlined text-xs">chevron_right</span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-2.5">
                      <button
                        onClick={onClose}
                        className="w-full bg-[#586427] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#3b4515] transition-all shadow-2xs"
                      >
                        Continuar comprando
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          onClose();
                        }}
                        className="w-full bg-white text-[#e53935] border border-[#e53935]/30 text-xs font-bold py-2.5 rounded-xl hover:bg-red-50 transition-all"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: MIS PEDIDOS (MY ORDERS HISTORY) */}
                {accountTab === 'orders' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {orders.length === 0 ? (
                      <div className="text-center py-8 px-4 bg-white rounded-2xl border border-[#827470]/12 space-y-3">
                        <div className="w-12 h-12 rounded-full bg-[#fbf2ed] text-[#586427] mx-auto flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl">receipt_long</span>
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-[#442a22]">Aún no tienes pedidos</h4>
                          <p className="text-xs text-[#504441] max-w-xs mx-auto mt-1">
                            Explora nuestras galletas artesanales y realiza tu primera compra para hacerle seguimiento aquí.
                          </p>
                        </div>
                        {onNavigateToCatalog && (
                          <button
                            onClick={() => {
                              onNavigateToCatalog();
                              onClose();
                            }}
                            className="bg-[#586427] text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-[#3b4515] transition-all shadow-2xs mt-2"
                          >
                            Ir al Catálogo 🍪
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1 scrollbar-none">
                        {orders.map((order) => {
                          const isExpanded = expandedOrderId === order.id;

                          return (
                            <div
                              key={order.id}
                              className="bg-white rounded-2xl border border-[#827470]/15 shadow-2xs overflow-hidden transition-all duration-200 hover:border-[#827470]/30"
                            >
                              {/* Order Card Header */}
                              <div className="p-4 bg-[#fbf2ed]/50 flex items-start justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-display font-bold text-sm text-[#442a22]">
                                      Pedido #{order.id}
                                    </span>
                                    {getStatusBadge(order.status)}
                                  </div>
                                  <div className="text-[11px] text-[#827470] flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">calendar_today</span>
                                    <span>{order.date}</span>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <span className="text-[10px] uppercase font-bold text-[#827470]">Total</span>
                                  <p className="font-display font-bold text-base text-[#442a22]">
                                    ${order.total.toFixed(2)}
                                  </p>
                                </div>
                              </div>

                              {/* Order Items Preview */}
                              <div className="p-4 space-y-3 border-t border-[#827470]/10">
                                <div className="space-y-2">
                                  {order.items.map((item, idx) => (
                                    <div key={`${item.id}-${idx}`} className="flex items-center gap-3 text-xs">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-10 h-10 object-cover rounded-xl border border-[#827470]/15 shrink-0 bg-[#fbf2ed]"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[#442a22] truncate">{item.name}</p>
                                        <p className="text-[11px] text-[#827470]">
                                          Cantidad: <span className="font-bold text-[#504441]">{item.quantity}</span> x ${item.price.toFixed(2)}
                                        </p>
                                      </div>
                                      <span className="font-bold text-[#442a22]">
                                        ${(item.quantity * item.price).toFixed(2)}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                {/* Expandable Details */}
                                {isExpanded && (
                                  <div className="pt-3 border-t border-[#827470]/10 text-xs space-y-2 bg-[#fbf2ed]/40 p-3 rounded-xl">
                                    {order.address && (
                                      <div className="flex items-start gap-2 text-[#504441]">
                                        <span className="material-symbols-outlined text-sm text-[#586427] mt-0.5">location_on</span>
                                        <div>
                                          <span className="font-bold text-[#442a22]">Dirección de entrega:</span>
                                          <p className="text-[11px] text-[#504441]">{order.address}</p>
                                        </div>
                                      </div>
                                    )}

                                    {order.paymentMethod && (
                                      <div className="flex items-center gap-2 text-[#504441] pt-1">
                                        <span className="material-symbols-outlined text-sm text-[#586427]">payments</span>
                                        <span className="font-bold text-[#442a22]">Pago:</span>
                                        <span className="text-[11px]">{order.paymentMethod}</span>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Toggle Expand Button */}
                                <div className="pt-1 flex justify-between items-center text-xs">
                                  <button
                                    type="button"
                                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                                    className="text-[11px] font-bold text-[#586427] hover:underline flex items-center gap-1"
                                  >
                                    <span>{isExpanded ? 'Ocultar detalles' : 'Ver detalles de entrega'}</span>
                                    <span className="material-symbols-outlined text-xs">
                                      {isExpanded ? 'expand_less' : 'expand_more'}
                                    </span>
                                  </button>

                                  <span className="text-[10px] text-[#827470] italic">
                                    {order.items.reduce((sum, i) => sum + i.quantity, 0)} artículo(s)
                                  </span>
                                </div>

                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

              </div>
            ) : (
              /* FORM FOR REGISTER / LOGIN */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Mode Switcher Pills */}
                <div className="grid grid-cols-2 p-1 bg-[#fbf2ed] rounded-2xl border border-[#827470]/15">
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      mode === 'register'
                        ? 'bg-[#586427] text-white shadow-2xs'
                        : 'text-[#504441] hover:text-[#442a22]'
                    }`}
                  >
                    Registrarse
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      mode === 'login'
                        ? 'bg-[#586427] text-white shadow-2xs'
                        : 'text-[#504441] hover:text-[#442a22]'
                    }`}
                  >
                    Iniciar Sesión
                  </button>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">error</span>
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>{successMsg}</span>
                  </div>
                )}

                <div className="space-y-3 text-xs">
                  
                  {mode === 'register' && (
                    <div className="space-y-1">
                      <label className="font-bold text-[#442a22]">Nombre completo *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Sakura Tanaka"
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#827470]/20 focus:outline-none focus:ring-2 focus:ring-[#586427]/30 text-xs"
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="font-bold text-[#442a22]">Correo electrónico *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#827470]/20 focus:outline-none focus:ring-2 focus:ring-[#586427]/30 text-xs"
                      required
                    />
                  </div>

                  {mode === 'register' && (
                    <div className="space-y-1">
                      <label className="font-bold text-[#442a22]">Teléfono (opcional)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+52 55 1234 5678"
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#827470]/20 focus:outline-none focus:ring-2 focus:ring-[#586427]/30 text-xs"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="font-bold text-[#442a22]">Contraseña *</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#827470]/20 focus:outline-none focus:ring-2 focus:ring-[#586427]/30 text-xs"
                      required
                    />
                  </div>

                  {mode === 'register' && (
                    <div className="space-y-1">
                      <label className="font-bold text-[#442a22]">Confirmar contraseña *</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#827470]/20 focus:outline-none focus:ring-2 focus:ring-[#586427]/30 text-xs"
                        required
                      />
                    </div>
                  )}

                  {mode === 'register' && (
                    <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={acceptNewsletter}
                        onChange={(e) => setAcceptNewsletter(e.target.checked)}
                        className="mt-0.5 rounded text-[#586427] focus:ring-[#586427]"
                      />
                      <span className="text-[11px] text-[#504441]">
                        Deseo recibir ofertas exclusivas, recetas y novedades del bosque de dulzura 🌿
                      </span>
                    </label>
                  )}

                </div>

                <button
                  type="submit"
                  className="w-full bg-[#442a22] text-white font-bold text-xs py-3 rounded-xl hover:bg-[#5d4037] active:scale-95 transition-all shadow-2xs mt-2"
                >
                  {mode === 'register' ? 'Crear mi cuenta Rin no mori' : 'Ingresar a mi cuenta'}
                </button>

                <p className="text-[10px] text-center text-[#827470]">
                  Al continuar, aceptas nuestros términos de servicio y políticas de privacidad.
                </p>

              </form>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

