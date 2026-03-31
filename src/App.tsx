/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { Instagram, MapPin, Star, User, MessageCircle, Heart, X, Send, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen w-full bg-[#F6EBEB] flex items-center justify-center p-4 sm:p-6 font-sans overflow-hidden relative">
      {/* Floral-like soft color blobs in the background to mimic the image's vibe */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#D1B3D1]/30 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B898B8]/25 rounded-full blur-3xl translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E8D0D0]/40 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[380px] bg-gradient-to-b from-[#FDF8F8] to-[#F3E8E8] rounded-[2.5rem] shadow-xl p-5 sm:p-6 relative z-10 border border-white/60"
      >
        <ProfileSection />
        
        <div className="mt-4 space-y-2">
          <LinkButton 
            title="Contato" 
            onClick={() => openModal('contact')} 
          />
          <LinkButton 
            title="Sobre Mim" 
            onClick={() => openModal('about')} 
          />
          <LinkButton 
            title="Como Funciona" 
            onClick={() => openModal('howItWorks')} 
          />
          <LinkButton 
            title="Instagram" 
            onClick={() => window.open('https://www.instagram.com/sirlei.psicanalise/', '_blank')} 
          />
          <LinkButton 
            title="Endereço" 
            onClick={() => openModal('location')} 
          />
          <LinkButton 
            title="Avaliação do Google" 
            onClick={() => openModal('rating')} 
          />
        </div>

        <Footer onDeveloperClick={() => openModal('developer')} />
      </motion.div>

      <Modals activeModal={activeModal} closeModal={closeModal} />
    </div>
  );
}

function ProfileSection() {
  const controls = useAnimation();
  const [spinCount, setSpinCount] = useState(0);
  const isSpinning = useRef(false);

  const handleLogoClick = async () => {
    if (isSpinning.current) return;
    isSpinning.current = true;
    
    const newCount = spinCount + 1;
    setSpinCount(newCount);
    
    const spins = Math.min(newCount * 2, 10); 
    const duration = Math.max(0.5, 3 - newCount * 0.2);

    await controls.start({
      rotateY: [0, spins * 360],
      transition: { 
        duration: duration, 
        ease: "easeOut"
      }
    });
    
    isSpinning.current = false;
  };

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div 
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px] bg-gradient-to-b from-[#C8A961] to-[#9A7B3E] shadow-md cursor-pointer mb-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogoClick}
        animate={controls}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img 
          src="/logo.png" 
          alt="Sirlei Carneiro Araújo" 
          className="w-full h-full object-cover rounded-full border-[3px] border-[#FDF8F8]"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl sm:text-[22px] font-serif text-[#3A2B35] tracking-wide"
      >
        Sirlei Carneiro Araújo
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#6B5B68] mt-0.5 mb-3"
      >
        Psicanalista
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#3A2B35]/15 to-transparent mx-auto mb-3"
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="font-serif italic text-[#5A4A59] text-sm sm:text-[15px] leading-snug"
      >
        <p>Seu processo importa.</p>
        <p>Sua história merece ser ouvida.</p>
      </motion.div>
    </div>
  );
}

function LinkButton({ title, onClick }: { title: string, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -5px rgba(58, 43, 53, 0.12)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-gradient-to-b from-[#FFFFFF] to-[#F4EBEB] border border-white/80 shadow-[0_4px_10px_rgba(0,0,0,0.04)] rounded-xl p-2.5 sm:p-3 flex items-center justify-center transition-all duration-300"
    >
      <span className="font-sans text-[13px] sm:text-sm text-[#3A2B35] tracking-wide">
        {title}
      </span>
    </motion.button>
  );
}

function Footer({ onDeveloperClick }: { onDeveloperClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-4 text-center"
    >
      <button 
        onClick={onDeveloperClick}
        className="text-[10px] sm:text-xs text-[#6B5B68] hover:text-[#3A2B35] transition-colors flex items-center justify-center gap-1 mx-auto"
      >
        Desenvolvido por InteligenciArte.IA ✨
      </button>
    </motion.div>
  );
}

// Modals Component (Placeholder for now)
function Modals({ activeModal, closeModal }: { activeModal: string | null, closeModal: () => void }) {
  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[85vh] overflow-y-auto relative border border-white/20"
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-200 transition-colors z-10 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 sm:p-8">
              {activeModal === 'about' && <AboutContent />}
              {activeModal === 'howItWorks' && <HowItWorksContent />}
              {activeModal === 'contact' && <ContactContent closeModal={closeModal} />}
              {activeModal === 'location' && <LocationContent />}
              {activeModal === 'rating' && <RatingContent closeModal={closeModal} />}
              {activeModal === 'developer' && <DeveloperContent closeModal={closeModal} />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Content placeholders
function AboutContent() {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A2B35] mb-2">
          Quem sou Eu?
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#C8A961] to-[#E8D0D0] mx-auto rounded-full mb-6"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gradient-to-br from-[#FDFBFB] to-[#F4F4F9] p-6 sm:p-8 rounded-3xl border border-[#C8A961]/20 relative overflow-hidden shadow-sm"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3A2B35] via-[#987698] to-[#C8A961]"></div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-serif text-lg sm:text-xl italic text-[#3A2B35] mb-6 relative z-10"
        >
          "Cuidar de você também é prioridade."
        </motion.p>
        
        <div className="space-y-4 text-[#5A4A59] text-sm sm:text-base leading-relaxed text-left relative z-10">
          <p>
            <strong className="text-[#3A2B35] font-semibold text-lg">Sirlei Carneiro Araújo</strong> atua como psicanalista auxiliando mulheres a lidarem com ansiedade, traumas e desafios emocionais do dia a dia.
          </p>
          <div className="flex items-start gap-3 bg-white/60 p-4 rounded-2xl border border-white">
            <Heart className="w-5 h-5 text-[#987698] flex-shrink-0 mt-1" fill="#987698" />
            <p>
              Com uma escuta sensível e acolhedora, já ajudou diversas mulheres a se reconectarem consigo mesmas e encontrarem mais equilíbrio e clareza em suas vidas.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C8A961]/10 rounded-full blur-2xl"></div>
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#987698]/10 rounded-full blur-2xl"></div>
      </motion.div>
    </div>
  );
}

function HowItWorksContent() {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A2B35] mb-2">
          Como Funciona
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#C8A961] to-[#E8D0D0] mx-auto rounded-full mb-6"></div>
      </motion.div>

      <div className="space-y-4 text-left text-[#5A4A59]">
        <div className="bg-[#FDF8F8] p-5 rounded-2xl border border-[#C8A961]/20">
          <h3 className="font-serif font-bold text-[#3A2B35] text-lg mb-2">Um espaço seguro</h3>
          <p className="text-sm">As sessões de psicanálise oferecem um ambiente confidencial e acolhedor para você explorar suas emoções, pensamentos e angústias sem julgamentos.</p>
        </div>
        <div className="bg-[#FDF8F8] p-5 rounded-2xl border border-[#C8A961]/20">
          <h3 className="font-serif font-bold text-[#3A2B35] text-lg mb-2">Atendimentos</h3>
          <p className="text-sm">As sessões podem ser realizadas de forma <strong>online</strong> ou <strong>presencial</strong>, com duração média de 50 minutos, focadas inteiramente no seu bem-estar.</p>
        </div>
      </div>
    </div>
  );
}

function ContactContent({ closeModal }: { closeModal: () => void }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "554288299398";
    const message = `Olá Sirlei, vim direto do seu link na bio, e gostaria de saber mais, me chamo ${name}, minha idade é ${age}, e o motivo é ${reason}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold text-[#3A2B35] mb-2">Entre em Contato</h2>
        <p className="text-sm text-[#6B5B68]">Preencha os dados abaixo para iniciarmos nossa conversa.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#5A4A59] mb-1">Nome</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#E8D0D0] focus:ring-2 focus:ring-[#C8A961] focus:border-transparent outline-none transition-all bg-[#FDF8F8]"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#5A4A59] mb-1">Idade</label>
          <input 
            type="number" 
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#E8D0D0] focus:ring-2 focus:ring-[#C8A961] focus:border-transparent outline-none transition-all bg-[#FDF8F8]"
            placeholder="Sua idade"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#5A4A59] mb-1">Motivo do contato</label>
          <textarea 
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 rounded-xl border border-[#E8D0D0] focus:ring-2 focus:ring-[#C8A961] focus:border-transparent outline-none transition-all resize-none bg-[#FDF8F8]"
            placeholder="Como posso te ajudar?"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-[#3A2B35] to-[#5A4A59] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}

function LocationContent() {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-serif font-bold text-[#3A2B35]">Onde Atendo</h2>
      <p className="text-sm text-[#6B5B68]">Um espaço acolhedor preparado especialmente para você.</p>
      
      <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#C8A961]/30 shadow-inner">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.349934691143!2d-50.11143462462068!3d-25.12385757775822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81b1495119b51%3A0x92dbfad36bbda766!2sPaulina%20leuzinski!5e0!3m2!1spt-BR!2sbr!4v1774962548579!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      <p className="text-sm font-medium text-[#3A2B35]">
        R. Paulina Leuzinski, 326 - Cará-Cará, Ponta Grossa - PR
      </p>
      
      <button 
        onClick={() => window.open('https://maps.google.com/?q=R.+Paulina+Leuzinski,+326+-+Cará-Cará,+Ponta+Grossa+-+PR', '_blank')}
        className="w-full bg-white border-2 border-[#3A2B35] text-[#3A2B35] font-semibold py-3 rounded-xl hover:bg-[#3A2B35] hover:text-white transition-all flex items-center justify-center gap-2"
      >
        <MapPin className="w-4 h-4" />
        Abrir no Google Maps
      </button>
    </div>
  );
}

function RatingContent({ closeModal }: { closeModal: () => void }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleRating = (value: number) => {
    setRating(value);
    if (value === 5) {
      window.open('https://search.google.com/local/writereview?placeid=ChIJ7e4vvlob6JQRPJPxMa0Mj7M', '_blank');
      closeModal();
    } else {
      setShowFeedback(true);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate formsubmit
    alert('Obrigado pelo seu feedback! Ele nos ajuda a melhorar.');
    closeModal();
  };

  if (showFeedback) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-serif font-bold text-[#3A2B35]">Como podemos melhorar?</h2>
        <p className="text-sm text-[#6B5B68]">Sua opinião é muito importante para nós.</p>
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <textarea 
            required
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-xl border border-[#E8D0D0] focus:ring-2 focus:ring-[#C8A961] outline-none resize-none bg-[#FDF8F8]"
            placeholder="Conte-nos o que houve..."
          />
          <button 
            type="submit"
            className="w-full bg-[#3A2B35] text-white font-semibold py-3 rounded-xl hover:bg-[#5A4A59] transition-colors"
          >
            Enviar Feedback
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-serif font-bold text-[#3A2B35]">Avalie meu atendimento</h2>
      <p className="text-sm text-[#6B5B68]">Como foi sua experiência?</p>
      
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleRating(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star 
              className={`w-10 h-10 sm:w-12 sm:h-12 ${
                star <= (hoveredRating || rating) 
                  ? 'fill-[#C8A961] text-[#C8A961]' 
                  : 'text-gray-300'
              } transition-colors`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function DeveloperContent({ closeModal }: { closeModal: () => void }) {
  const [clientName, setClientName] = useState('');

  const handleContactDev = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "5541988710303";
    const message = `Olá, me chamo ${clientName}! Vi o link da Sirlei Carneiro Araújo e quero um site igual!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    closeModal();
  };

  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-[#3A2B35] to-[#5A4A59] rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
        <span className="text-white font-serif font-bold text-2xl">IA</span>
      </div>
      
      <h2 className="text-2xl font-serif font-bold text-[#3A2B35]">InteligenciArte.IA</h2>
      <p className="text-sm text-[#6B5B68]">Criamos experiências digitais únicas e elegantes.</p>
      
      <button 
        onClick={() => window.open('https://instagram.com/inteligenciarte.ia', '_blank')}
        className="text-[#987698] font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
      >
        <Instagram className="w-4 h-4" />
        @inteligenciarte.ia
      </button>

      <div className="pt-6 border-t border-[#E8D0D0]">
        <h3 className="font-semibold text-[#3A2B35] mb-4">Quer um site incrível como esse?</h3>
        <form onSubmit={handleContactDev} className="space-y-4">
          <input 
            type="text" 
            required
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#E8D0D0] focus:ring-2 focus:ring-[#C8A961] outline-none text-center bg-[#FDF8F8]"
            placeholder="Seu nome"
          />
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#C8A961] to-[#E8D0D0] text-[#3A2B35] font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            Fale comigo! 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

