import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AtmosphericBackground from "@/components/AtmosphericBackground";
import { useToast } from "@/hooks/use-toast";
import { TextScramble } from "@/components/ui/text-scramble";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/dashboard"
    }, {
      onSuccess: () => {
        toast({ 
          title: "Welcome back, Hunter", 
          description: "Entering the system...",
        });
        navigate("/dashboard");
      },
      onError: (ctx) => {
        toast({ 
          title: "SignIn Failed", 
          description: ctx.error.message, 
          variant: "destructive" 
        });
      },
    });
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    await authClient.signIn.social({
        provider: provider,
        callbackURL: "/dashboard"
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
      <AtmosphericBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-panel neon-border p-8 md:p-10 rounded-xl bg-card/80 backdrop-blur-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <span>
              <TextScramble className="text-glow font-display text-2xl font-bold tracking-[0.2em] text-foreground font-mono uppercase">
                ASCEND.
              </TextScramble>
            </span>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-wide">
              Welcome Back, Hunter
            </h1>
            <p className="text-muted-foreground text-sm">Sign in to continue your journey</p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              onClick={() => handleOAuth("google")}
              className="w-full h-12 bg-secondary/60 hover:bg-secondary border border-border/40 text-foreground font-medium gap-3"
            >
              <GoogleIcon />
              Continue with Google
            </Button>
            <Button
              type="button"
              onClick={() => handleOAuth("github")}
              className="w-full h-12 bg-secondary/60 hover:bg-secondary border border-border/40 text-foreground font-medium gap-3"
            >
              <GitHubIcon />
              Continue with GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
          </div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 space-y-5">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground/90">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="hunter@example.com"
                        {...register("email")}
                        className={`h-12 pl-10 bg-secondary/40 border-border/40 focus-visible:ring-primary ${errors.email ? "border-destructive/50" : ""}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground/90">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                        className={`h-12 pl-10 bg-secondary/40 border-border/40 focus-visible:ring-primary ${errors.password ? "border-destructive/50" : ""}`}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-secondary/60 hover:bg-primary/80 border border-border/40 text-foreground font-semibold transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      "Sign In with Email"
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            New hunter?{" "}
            <Link to="/sign-up" className="text-accent hover:text-accent/80 font-medium transition-colors">
              Create an account
            </Link>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-muted-foreground/60 mt-6 tracking-wider uppercase">
          The System Awaits
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
