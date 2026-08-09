import React, { useState } from "react";
import { Section } from "../layout/Section";
import { profile } from "../../data/profile";
import { Mail, Send, CheckCircle2, Loader2, MapPin, Code2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { GithubIcon, LinkedinIcon } from "../ui/icons";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const messageVal = watch("message", "");

  const onSubmit = async (data) => {
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS environment variables are missing.");
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 4000);
        return;
      }

      const templateParams = {
        from_name: data.name,
        reply_to: data.email,
        message: data.message,
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey,
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 4000);
      }
    } catch (err) {
      console.error("Failed to send email:", err);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  return (
    <Section id="contact" title="Get In Touch" className="relative">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <Reveal type="blur" className="relative">
          {/* Animated decorative element */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-8 w-20 h-20 bg-gradient-to-br from-primary/20 to-sky/20 rounded-full blur-xl pointer-events-none"
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -left-2 w-10 h-10 bg-white/60 backdrop-blur-md rounded-xl border border-black/5 flex items-center justify-center text-primary shadow-sm pointer-events-none rotate-12"
          >
            <Code2 size={20} />
          </motion.div>

          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight relative z-10">
            Let's Build Something Together.
          </h3>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed relative z-10">
            I am open to internships, freelance opportunities, collaborations,
            and interesting software projects.
          </p>

          <Badge
            variant="outline"
            className="mb-10 border-green-500/30 text-green-700 bg-green-500/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2 relative z-10"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Open to opportunities
          </Badge>

          <div className="flex flex-col gap-6 relative z-10">
            <motion.a
              whileHover={{ x: 5 }}
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-foreground group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                <Mail size={20} />
              </div>
              <span className="font-medium text-lg">{profile.email}</span>
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-foreground group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                <LinkedinIcon size={20} />
              </div>
              <span className="font-medium text-lg">LinkedIn</span>
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-foreground group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                <GithubIcon size={20} />
              </div>
              <span className="font-medium text-lg">GitHub</span>
            </motion.a>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-foreground group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                <MapPin size={20} />
              </div>
              <span className="font-medium text-lg">Pokhara, Nepal</span>
            </motion.div>
          </div>
        </Reveal>

        <Reveal type="blur" delay={0.2} className="relative">
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="min-h-[350px] flex flex-col items-center justify-center relative z-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <CheckCircle2 size={64} className="text-primary mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mt-2 text-center px-6">
                    Thanks for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5 relative z-10"
                >
                  <div className="relative group">
                    <input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      className="peer w-full bg-white/40 border border-black/5 rounded-2xl px-5 pt-8 pb-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white/60 transition-all placeholder-transparent shadow-sm hover:shadow-md"
                      placeholder="Your name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-5 text-muted-foreground transition-all duration-300 pointer-events-none 
                                 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                                 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-primary 
                                 top-2.5 text-xs font-medium"
                    >
                      Name
                    </label>
                    {errors.name && (
                      <span className="text-red-400 text-xs mt-1 ml-2 block">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="peer w-full bg-white/40 border border-black/5 rounded-2xl px-5 pt-8 pb-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white/60 transition-all placeholder-transparent shadow-sm hover:shadow-md"
                      placeholder="you@example.com"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-5 text-muted-foreground transition-all duration-300 pointer-events-none 
                                 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                                 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-primary 
                                 top-2.5 text-xs font-medium"
                    >
                      Email Address
                    </label>
                    {errors.email && (
                      <span className="text-red-400 text-xs mt-1 ml-2 block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="relative group mt-2">
                    <textarea
                      id="message"
                      rows={6}
                      maxLength={1000}
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="peer w-full bg-white/40 border border-black/5 rounded-2xl px-5 pt-8 pb-6 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white/60 transition-all placeholder-transparent resize-none shadow-sm hover:shadow-md"
                      placeholder="Tell me what's on your mind..."
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-5 text-muted-foreground transition-all duration-300 pointer-events-none 
                                 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                                 peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary 
                                 top-3 text-xs font-medium"
                    >
                      Your Message
                    </label>
                    <span className="absolute bottom-3 right-5 text-xs text-muted-foreground/60">
                      {messageVal.length} / 1000
                    </span>
                    {errors.message && (
                      <span className="text-red-400 text-xs mt-1 ml-2 block">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-4 text-white font-semibold rounded-2xl py-4 px-6 flex items-center justify-center gap-2 shadow-lg shadow-black/10 relative overflow-hidden group transition-colors duration-300 ${submitStatus === "error" ? "bg-red-500 hover:bg-red-600" : "bg-foreground hover:bg-primary"}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <Loader2 size={18} className="animate-spin" />
                          <span>Sending...</span>
                        </motion.div>
                      ) : submitStatus === "error" ? (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <span>Try Again</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <span>Send Message &rarr;</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};
