import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { StepProps, QuizData } from '../types';
import { Heart, Send, Copy, ArrowRight } from 'lucide-react';

// Animation variants for container
const containerVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  exit: { opacity: 0, y: -20, scale: 0.95 }
};

// Reusable Bouncy Button
const BouncyButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string; disabled?: boolean }> = ({ onClick, children, className, disabled }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`font-heading font-bold text-lg py-3 px-8 rounded-full shadow-lg transition-colors ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {children}
  </motion.button>
);

// --- Step 1: Welcome ---
export const WelcomeStep: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="text-center flex flex-col items-center justify-center h-full space-y-6"
  >
    <motion.div 
      animate={{ rotate: [0, 5, -5, 0] }} 
      transition={{ repeat: Infinity, duration: 2 }}
      className="text-6xl mb-2"
    >
      💌
    </motion.div>
    <h1 className="font-heading text-4xl md:text-5xl text-gray-800 font-extrabold leading-tight drop-shadow-sm">
      My <br/><span className="text-secondary">Muse Profile</span> 💖✨
    </h1>
    <p className="font-body text-gray-600 text-lg px-4">
      Trả lời mấy câu hỏi xàm xí để anh hiểu bé hơn nè!
    </p>
    <div className="pt-4">
      <BouncyButton onClick={onStart} className="bg-gradient-to-r from-primary to-secondary text-white shadow-pink-300">
        Bắt đầu thôi! 🚀
      </BouncyButton>
    </div>
  </motion.div>
);

// --- Step 2: Basics ---
export const BasicsStep: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const isValid = data.nickname.length > 0 && data.birthday.length > 0;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 w-full">
      <h2 className="font-heading text-2xl text-gray-800 text-center mb-6">Thông tin cơ bản 📝</h2>
      
      <div className="space-y-2">
        <label className="font-heading text-gray-700 ml-1">Em sẽ rất thích nếu anh gọi em bằng ?</label>
        <input
          type="text"
          value={data.nickname}
          onChange={(e) => updateData({ nickname: e.target.value })}
          placeholder="Ví dụ: Bé Heooo"
          className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-pink-200 transition-all font-body text-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label className="font-heading text-gray-700 ml-1">Ngày bé sinh ra đời 🎂 (Ví dụ: 02/07/07)</label>
        <input
          type="date"
          value={data.birthday}
          onChange={(e) => updateData({ birthday: e.target.value })}
          className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-pink-200 transition-all font-body text-gray-700"
        />
      </div>

      <div className="pt-4 flex justify-center">
        <BouncyButton 
          onClick={onNext} 
          disabled={!isValid}
          className="bg-white text-secondary border-2 border-secondary/20 hover:bg-pink-50 w-full"
        >
          Tiếp theo <ArrowRight className="inline ml-2 w-5 h-5" />
        </BouncyButton>
      </div>
    </motion.div>
  );
};

// --- Step 3: Vibe Check ---
export const VibeCheckStep: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const handleSelect = (key: 'drink' | 'style', value: string) => {
    // Trigger small confetti burst at cursor/center
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#ff8fab', '#fb6f92', '#ffffff']
    });
    updateData({ [key]: value });
  };

  const isComplete = data.drink && data.style;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 w-full">
      <h2 className="font-heading text-2xl text-gray-800 text-center">Vibe Check ✨</h2>

      {/* Drink Section */}
      <div className="space-y-3">
        <p className="font-heading text-gray-600 text-center">Nước uống chân ái của iêm ?</p>
        <div className="grid grid-cols-2 gap-3">
          {['Trà sữa full topping 🧋', 'Cà phê tỉnh táo ☕','Trà trái cây healthy 🥭','Matcha lattee 🍵'].map((opt) => (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect('drink', opt)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center h-32 gap-2 shadow-sm ${
                data.drink === opt 
                  ? 'bg-pink-100 border-secondary text-secondary shadow-pink-200' 
                  : 'bg-white/60 border-white text-gray-600 hover:bg-white/80'
              }`}
            >
              <span className="text-3xl">{opt.split(' ').pop()}</span>
              <span className="font-bold text-sm leading-tight">{opt.replace(/.$/,'')}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Style Section */}
      <div className="space-y-3">
        <p className="font-heading text-gray-600 text-center">Style đi chơi?</p>
        <div className="grid grid-cols-2 gap-3">
          {['Bánh bèo công chúa 🎀', 'Năng động cool ngầu 😎','Thích cả hai (QUÁ LÀ THAM LAM)'].map((opt) => (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect('style', opt)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center h-32 gap-2 shadow-sm ${
                data.style === opt 
                  ? 'bg-purple-100 border-accent text-accent shadow-purple-200' 
                  : 'bg-white/60 border-white text-gray-600 hover:bg-white/80'
              }`}
            >
              <span className="text-3xl">{opt.split(' ').pop()}</span>
              <span className="font-bold text-sm leading-tight">{opt.replace(/.$/,'')}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        <BouncyButton 
          onClick={onNext} 
          disabled={!isComplete}
          className="bg-secondary text-white w-full"
        >
          Tiếp luôn!
        </BouncyButton>
      </div>
    </motion.div>
  );
};

// --- Step 4: Situationship ---
export const SituationStep: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  const handleSelect = (key: 'angryAction' | 'weekend', value: string) => {
    updateData({ [key]: value });
  };

  const isComplete = data.angryAction && data.weekend;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 w-full">
      <h2 className="font-heading text-2xl text-gray-800 text-center">Xử lý tình huống 🧩</h2>

      <div className="space-y-3">
        <p className="font-heading text-lg text-secondary">Anh mà dỗi thì em sẽ...</p>
        <div className="flex flex-col gap-2">
          {['Kệ anh, dỗi tí là hết 🙄', 'Chọc cho anh cười 😂', 'Dỗ ngọt ngào, hun cái 🥺'].map((opt) => (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect('angryAction', opt)}
              className={`p-3 rounded-xl border text-left px-4 font-body transition-all ${
                data.angryAction === opt 
                  ? 'bg-white border-secondary text-secondary shadow-md font-semibold' 
                  : 'bg-white/40 border-transparent text-gray-700 hover:bg-white/60'
              }`}
            >
               {data.angryAction === opt ? '💖 ' : '○ '} {opt}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-heading text-lg text-secondary">Cuối tuần lý tưởng?</p>
        <div className="flex flex-col gap-2">
          {['Nằm nhà cày Netflix 🎬', 'Đi cháy phố chụp ảnh 📸', 'Đi ăn sập quán ngon 🍕','Đi cà hê chill chill ngắm cảnh, trò chuyện với nhau ☕'].map((opt) => (
             <motion.button
             key={opt}
             whileTap={{ scale: 0.98 }}
             onClick={() => handleSelect('weekend', opt)}
             className={`p-3 rounded-xl border text-left px-4 font-body transition-all ${
               data.weekend === opt 
                 ? 'bg-white border-secondary text-secondary shadow-md font-semibold' 
                 : 'bg-white/40 border-transparent text-gray-700 hover:bg-white/60'
             }`}
           >
              {data.weekend === opt ? '💖 ' : '○ '} {opt}
           </motion.button>
          ))}
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        <BouncyButton 
          onClick={onNext} 
          disabled={!isComplete}
          className="bg-secondary text-white w-full"
        >
          Sắp xong rùi
        </BouncyButton>
      </div>
    </motion.div>
  );
};

// --- Step 5: Deep Stuff ---
export const DeepStep: React.FC<StepProps> = ({ data, updateData, onNext }) => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 w-full h-full flex flex-col">
      <h2 className="font-heading text-2xl text-gray-800 text-center">Câu hỏi chốt hạ 🤫</h2>
      
      <div className="flex-grow space-y-2 flex flex-col">
        <label className="font-heading text-lg text-gray-700 block text-center">
          Điều gì ở anh làm em "đổ" cái rầm? <br/><span className="text-sm font-normal text-gray-500">(Ghi thật nha!)</span>
        </label>
        <textarea
          value={data.crushFactor}
          onChange={(e) => updateData({ crushFactor: e.target.value })}
          placeholder="Ví dụ: ĐẸP TRAI, thơm, hay cười..."
          className="w-full flex-grow p-4 rounded-2xl border-2 border-white/50 bg-white/50 backdrop-blur-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-pink-200 transition-all font-body text-gray-700 resize-none min-h-[150px]"
        />
      </div>

      <div className="pt-2 flex justify-center">
         <BouncyButton 
          onClick={onNext} 
          disabled={data.crushFactor.length < 3}
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white w-full shadow-lg"
        >
          U LÀ TRỪI, BÉ NÀY NGOANN DỮ VẬY TA !!! 🎉
        </BouncyButton>
      </div>
    </motion.div>
  );
};

// --- Step 6: Finale ---
export const FinaleStep: React.FC<{ data: QuizData }> = ({ data }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    // Big celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff8fab', '#fb6f92']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8338ec', '#3a86ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const generateMessage = () => {
    return `
💖 *Hồ sơ tình yêu của ${data.nickname}* 💖

🎂 Sinh nhật: ${data.birthday}
🥤 Nước uống: ${data.drink}
🎀 Style: ${data.style}
😡 Khi dỗi: ${data.angryAction}
📅 Cuối tuần: ${data.weekend}

🤫 *Điểm G (Gu):* 
"${data.crushFactor}"

------------------
Yêu anh đi đừng ngại! 😘
    `.trim();
  };

  const handleCopy = () => {
    const msg = generateMessage();
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleSend = () => {
     // WhatsApp link (standard fallback)
     // Since Zalo doesn't have a direct "send text" URL scheme that works reliably across devices without an SDK, 
     // Copy to clipboard is the safest mobile-web approach for Gen Z in Vietnam, but we can try a mailto or just rely on Copy.
     handleCopy();
     // If we wanted to open a general share:
     if (navigator.share) {
       navigator.share({
         title: `Hồ sơ của ${data.nickname}`,
         text: generateMessage()
       }).catch(console.error);
     }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center space-y-6">
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }} 
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-6xl"
      >
        🎉✨
      </motion.div>
      <h2 className="font-heading text-3xl font-bold text-gray-800">
        Xong rồi nè! <br/> <span className="text-secondary text-2xl">Cảm ơn bé iuuu</span>
      </h2>
      
      <div className="bg-white/40 p-4 rounded-xl text-left text-sm text-gray-700 font-body space-y-1 backdrop-blur-sm border border-white/50">
        <p><strong>Nickname:</strong> {data.nickname}</p>
        <p><strong>Style:</strong> {data.style}</p>
        <p><strong>Gu:</strong> {data.crushFactor}</p>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <BouncyButton onClick={handleCopy} className={`w-full flex items-center justify-center gap-2 ${copied ? 'bg-green-400' : 'bg-white text-secondary'}`}>
           {copied ? (
             <>Đã copy! Gửi Zalo nha ✅</>
           ) : (
             <><Copy size={20} /> Copy kết quả</>
           )}
        </BouncyButton>
        
        <BouncyButton onClick={handleSend} className="w-full bg-gradient-to-r from-secondary to-pink-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-pink-200">
          <Heart fill="currentColor" size={20} /> Gửi cho anh iu
        </BouncyButton>
      </div>
    </motion.div>
  );
};