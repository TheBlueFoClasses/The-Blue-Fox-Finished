import React, { useState, useEffect } from 'react';
import { X, Sparkles, Receipt, CreditCard, Check, Ticket, Award, Users, Coffee, Loader2 } from 'lucide-react';
import { ArtClass } from '../types';
import { CLASSES_DATA } from '../data';

interface RegistrationModalProps {
  selectedClass: ArtClass | null;
  onClose: () => void;
}

export default function RegistrationModal({ selectedClass, onClose }: RegistrationModalProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'ticket'>('form');
  const [classId, setClassId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'offline' | 'online'>('offline');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Local state to keep track of final submitted details
  const [ticketDetails, setTicketDetails] = useState<{
    ticketNo: string;
    className: string;
    studentName: string;
    studentEmail: string;
    count: number;
    price: number;
    notes: string;
    paymentMethod: 'online' | 'offline';
    isPaid: boolean;
  } | null>(null);

  const [customDateLabel, setCustomDateLabel] = useState('');

  // Auto-fill selected class if provided
  useEffect(() => {
    if (selectedClass) {
      setClassId(selectedClass.id);
      if (selectedClass.dateLabel) {
        setCustomDateLabel(selectedClass.dateLabel);
      }
    } else if (CLASSES_DATA.length > 0) {
      setClassId(CLASSES_DATA[0].id);
      setCustomDateLabel('');
    }
  }, [selectedClass]);

  // Resolve base class template if classId is a scheduled instance ID (e.g. class-1-2026-07-14)
  const baseClassId = classId.split('-').slice(0, 2).join('-');
  const currentClassObj = CLASSES_DATA.find((c) => c.id === classId) || CLASSES_DATA.find((c) => c.id === baseClassId) || CLASSES_DATA[0];

  const handleClassChange = (newClassId: string) => {
    setClassId(newClassId);
    const matched = CLASSES_DATA.find(c => c.id === newClassId);
    if (matched) {
      setCustomDateLabel(matched.dateLabel);
    } else {
      setCustomDateLabel('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;

    // Generate random Ticket ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const mockTicketNo = `BF-${randomNum}`;

    if (paymentMethod === 'online') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setTicketDetails({
          ticketNo: mockTicketNo,
          className: currentClassObj.title,
          studentName,
          studentEmail,
          count: attendeesCount,
          price: currentClassObj.price * attendeesCount,
          notes: specialNotes,
          paymentMethod: 'online',
          isPaid: true
        });
        setActiveTab('ticket');
      }, 1500);
    } else {
      setTicketDetails({
        ticketNo: mockTicketNo,
        className: currentClassObj.title,
        studentName,
        studentEmail,
        count: attendeesCount,
        price: currentClassObj.price * attendeesCount,
        notes: specialNotes,
        paymentMethod: 'offline',
        isPaid: false
      });
      setActiveTab('ticket');
    }
  };

  return (
    <div
      id="registration-modal-root"
      className="fixed inset-0 bg-oiler-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        id="registration-modal-body"
        className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl relative border border-ocean-water/40 my-8 animate-fade-in text-left flex flex-col"
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-brilliant-blue to-oiler-navy p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-mango" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-black text-white">
                {activeTab === 'form' ? 'Reserve Art Studio Seat' : 'Reservation Confirmed!'}
              </h3>
              <p className="text-[10px] text-ocean-water font-sans uppercase tracking-widest font-semibold mt-0.5">
                The Blue Fox Studio
              </p>
            </div>
          </div>
          <button
            id="modal-close-top-btn"
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(100vh-160px)]">
          {activeTab === 'form' ? (
            <form id="modal-registration-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Class selection dropdown */}
              <div id="modal-class-select-wrapper">
                <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2">
                  Select Your Desired Art Class
                </label>
                <select
                  id="modal-class-selector"
                  value={classId}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="w-full bg-white text-oiler-navy p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans font-bold text-sm shadow-sm"
                >
                  {CLASSES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} (${c.price}/slot) - {c.ageLabel}
                    </option>
                  ))}
                </select>
                {customDateLabel && (
                  <p className="mt-2 text-xs font-semibold text-sunset-orange bg-sunset-orange/10 px-3 py-1.5 rounded-xl inline-block font-sans">
                    📅 Selected Session Date: <span className="font-bold">{customDateLabel}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Seats count slider/input */}
                <div id="modal-seats-count-wrapper">
                  <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2">
                    Seats (Count)
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      id="modal-seats-decrement"
                      type="button"
                      disabled={attendeesCount <= 1}
                      onClick={() => setAttendeesCount(attendeesCount - 1)}
                      className="w-11 h-11 bg-ocean-water/30 text-oiler-navy hover:bg-ocean-water font-black text-base rounded-xl transition-all disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold font-mono w-8 text-center text-oiler-navy">
                      {attendeesCount}
                    </span>
                    <button
                      id="modal-seats-increment"
                      type="button"
                      disabled={attendeesCount >= 6}
                      onClick={() => setAttendeesCount(attendeesCount + 1)}
                      className="w-11 h-11 bg-ocean-water/30 text-oiler-navy hover:bg-ocean-water font-black text-base rounded-xl transition-all disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] text-oiler-navy/55 font-sans mt-1 block">Max 6 seats per booking</span>
                </div>

                {/* Subtotal preview card */}
                <div
                  id="modal-price-preview-card"
                  className="bg-ocean-water/20 p-4 rounded-2xl border border-ocean-water/45 flex flex-col justify-center text-center"
                >
                  <span className="text-[10px] uppercase text-oiler-navy/60 font-semibold mb-0.5">Total Reservation Fee</span>
                  <div className="flex items-center justify-center text-oiler-navy font-serif font-black text-3xl">
                    <Receipt className="w-5 h-5 text-sunset-orange shrink-0 mr-1.5" />
                    <span>${currentClassObj ? currentClassObj.price * attendeesCount : 0}</span>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <div id="modal-student-name-wrapper">
                  <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2">
                    Student Full Name
                  </label>
                  <input
                    id="modal-student-name-input"
                    type="text"
                    required
                    placeholder="Grandma Helen & Chloe"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-white text-oiler-navy placeholder-oiler-navy/30 p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm"
                  />
                </div>

                <div id="modal-student-email-wrapper">
                  <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2">
                    Email for Ticket Confirmation
                  </label>
                  <input
                    id="modal-student-email-input"
                    type="email"
                    required
                    placeholder="helen.grandma@example.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full bg-white text-oiler-navy placeholder-oiler-navy/30 p-3.5 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm"
                  />
                </div>

                <div id="modal-student-notes-wrapper">
                  <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-2">
                    Special notes or Tea preferences (Optional)
                  </label>
                  <textarea
                    id="modal-student-notes-textarea"
                    rows={2}
                    placeholder="Wheelchair access needed, or preference for decaf herbal berry tea..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-white text-oiler-navy placeholder-oiler-navy/30 p-3 px-4 rounded-2xl border border-ocean-water focus:outline-none focus:ring-2 focus:ring-brilliant-blue font-sans shadow-sm"
                  />
                </div>
              </div>

              {/* Payment Option Selector */}
              <div id="payment-method-selector-container" className="space-y-3 pt-2">
                <label className="block text-xs font-black text-oiler-navy/70 uppercase tracking-widest mb-1">
                  Choose Payment Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="pay-option-offline"
                    type="button"
                    onClick={() => setPaymentMethod('offline')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all text-center cursor-pointer ${
                      paymentMethod === 'offline'
                        ? 'border-sunset-orange bg-sunset-orange/5 text-oiler-navy'
                        : 'border-ocean-water/40 bg-white hover:bg-ocean-water/10 text-oiler-navy/70'
                    }`}
                  >
                    <Coffee className="w-5 h-5 text-sunset-orange mb-1.5 shrink-0" />
                    <span className="font-serif font-black text-xs uppercase tracking-wide">Pay on Arrival</span>
                    <span className="text-[9px] font-sans text-oiler-navy/60 mt-1">Cash, card, or check</span>
                  </button>

                  <button
                    id="pay-option-online"
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all text-center cursor-pointer ${
                      paymentMethod === 'online'
                        ? 'border-sunset-orange bg-sunset-orange/5 text-oiler-navy'
                        : 'border-ocean-water/40 bg-white hover:bg-ocean-water/10 text-oiler-navy/70'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-brilliant-blue mb-1.5 shrink-0" />
                    <span className="font-serif font-black text-xs uppercase tracking-wide">Pay Online Now</span>
                    <span className="text-[9px] font-sans text-oiler-navy/60 mt-1">Instant secure card checkout</span>
                  </button>
                </div>
              </div>

              {/* Secure Card Form for Online Checkout */}
              {paymentMethod === 'online' ? (
                <div id="online-card-details-form" className="bg-ocean-water/15 p-4 rounded-2xl border border-ocean-water/30 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-ocean-water/30 pb-2 mb-2">
                    <span className="text-xs font-serif font-black text-oiler-navy uppercase tracking-wide flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-brilliant-blue" />
                      Secure Credit Card Details
                    </span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      SSL Encrypted
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-oiler-navy/70 uppercase tracking-widest mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required={paymentMethod === 'online'}
                      placeholder="Jane Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-white text-oiler-navy placeholder-oiler-navy/30 p-2.5 rounded-xl border border-ocean-water text-xs font-sans focus:outline-none focus:ring-2 focus:ring-brilliant-blue shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-oiler-navy/70 uppercase tracking-widest mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required={paymentMethod === 'online'}
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        maxLength={19}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                          setCardNumber(val);
                        }}
                        className="w-full bg-white text-oiler-navy placeholder-oiler-navy/30 p-2.5 rounded-xl border border-ocean-water text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brilliant-blue shadow-sm"
                      />
                      <CreditCard className="w-4 h-4 text-oiler-navy/40 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-oiler-navy/70 uppercase tracking-widest mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required={paymentMethod === 'online'}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        maxLength={5}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 2) {
                            val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                          }
                          setCardExpiry(val);
                        }}
                        className="w-full bg-white text-oiler-navy placeholder-oiler-navy/30 p-2.5 rounded-xl border border-ocean-water text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brilliant-blue shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-oiler-navy/70 uppercase tracking-widest mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        required={paymentMethod === 'online'}
                        placeholder="123"
                        value={cardCvv}
                        maxLength={3}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-white text-oiler-navy placeholder-oiler-navy/30 p-2.5 rounded-xl border border-ocean-water text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brilliant-blue shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div id="modal-security-badge" className="p-4 bg-ocean-water/10 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed text-oiler-navy/75">
                  <CreditCard className="w-5 h-5 text-brilliant-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>Pay at the Studio Policy:</strong> To keep things completely carefree, you don't need a credit card online! 
                    Simply register your space, show up, and pay cash, card, or check after your painting session.
                  </span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                id="modal-submit-registration-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full bg-sunset-orange hover:bg-mango disabled:bg-sunset-orange/60 text-white font-serif font-extrabold text-base tracking-widest uppercase py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>SECURELY PROCESSING PAY...</span>
                  </>
                ) : (
                  <span>
                    {paymentMethod === 'online' ? 'PAY & SECURE MY SEAT NOW' : 'CONFIRM FREE SEAT RESERVATION'}
                  </span>
                )}
              </button>

            </form>
          ) : (
            /* Whimsical Board Ticket Display */
            <div id="modal-ticket-receipt-block" className="space-y-6 pt-2 text-center animate-fade-in">
              <div className="w-16 h-16 bg-ocean-water text-oiler-navy rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-sunset-orange animate-bounce">
                <Award className="w-8 h-8 text-sunset-orange" />
              </div>

              <h4 className="text-2xl font-serif font-black text-oiler-navy">Your Artsy Spot is Locked In!</h4>
              <p className="text-sm text-oiler-navy/85 max-w-sm mx-auto font-sans">
                A warm digital seat invitation has been flying out to <strong className="text-oiler-navy">{ticketDetails?.studentEmail}</strong>. 
                Bring this sweet receipt pass on your smartphone or print it out!
              </p>

              {/* Physical/Visual Ticket block representation */}
              <div
                id="printable-ticket-card"
                className="bg-gradient-to-tr from-ocean-water/55 to-white p-6 rounded-3xl border-4 border-dashed border-brilliant-blue/30 relative text-left"
              >
                {/* Decorative circle cuts in middle side border simulating ticket punch */}
                <div className="w-8 h-8 bg-white rounded-full border-r border-dashed border-brilliant-blue/30 absolute left-0 top-1/2 -translate-y-1/2 -ml-4" />
                <div className="w-8 h-8 bg-white rounded-full border-l border-dashed border-brilliant-blue/30 absolute right-0 top-1/2 -translate-y-1/2 -mr-4" />

                <div className="flex justify-between items-start border-b border-oiler-navy/10 pb-4 mb-4">
                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-sunset-orange text-white px-2.5 py-1 rounded">
                        ADMIT {ticketDetails?.count}
                      </span>
                      {ticketDetails?.isPaid ? (
                        <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-600 text-white px-2.5 py-1 rounded flex items-center gap-1">
                          <Check className="w-2.5 h-2.5 stroke-[3]" /> PAID ONLINE
                        </span>
                      ) : (
                        <span className="text-[9px] font-black uppercase tracking-widest bg-brilliant-blue text-white px-2.5 py-1 rounded">
                          DUE AT ENTRY
                        </span>
                      )}
                    </div>
                    <h5 className="font-serif font-extrabold text-lg text-oiler-navy mt-2">
                      {ticketDetails?.className}
                    </h5>
                  </div>
                  <Ticket className="w-8 h-8 text-brilliant-blue opacity-55" />
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 font-sans text-xs">
                  <div>
                    <span className="text-[10px] text-oiler-navy/55 block uppercase font-bold tracking-wider">Artsy Holder</span>
                    <strong className="text-oiler-navy text-sm">{ticketDetails?.studentName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-oiler-navy/55 block uppercase font-bold tracking-wider">Ticket Number</span>
                    <strong className="text-oiler-navy text-sm font-mono">{ticketDetails?.ticketNo}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-oiler-navy/55 block uppercase font-bold tracking-wider">Studio Size</span>
                    <span className="text-oiler-navy text-xs font-semibold flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-sunset-orange shrink-0" />
                      <span>{ticketDetails?.count} Cozy seats booked</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-oiler-navy/55 block uppercase font-bold tracking-wider">
                      {ticketDetails?.isPaid ? 'Total Paid (Securely Online)' : 'Amount Due At Entry'}
                    </span>
                    {ticketDetails?.isPaid ? (
                      <strong className="text-emerald-600 text-sm font-black flex items-center gap-1">
                        <Check className="w-4 h-4 text-emerald-600" />
                        ${ticketDetails?.price} Total
                      </strong>
                    ) : (
                      <strong className="text-oiler-navy text-sm">${ticketDetails?.price} Total</strong>
                    )}
                  </div>
                </div>

                {ticketDetails?.notes && (
                  <div className="mt-4 pt-3 border-t border-oiler-navy/10 text-[11px] leading-relaxed italic text-oiler-navy/70 font-sans">
                    <strong>Cozy Notes:</strong> "{ticketDetails.notes}"
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  id="print-ticket-trigger-btn"
                  onClick={() => window.print()}
                  className="flex-1 bg-oiler-navy hover:bg-brilliant-blue text-white text-xs font-black tracking-widest uppercase py-3.5 rounded-full transition-all"
                >
                  🖨️ PRINT PASS
                </button>
                <button
                  id="close-ticket-success-btn"
                  onClick={onClose}
                  className="flex-1 bg-ocean-water hover:bg-ocean-water/70 text-oiler-navy text-xs font-black tracking-widest uppercase py-3.5 rounded-full transition-all"
                >
                  DONE, CLOSE WINDOW
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
