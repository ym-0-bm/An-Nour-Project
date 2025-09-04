import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Logo and branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-secondary/10 items-center justify-center p-12">
        <div className="text-center space-y-6 max-w-md">
          {/* An-Nour Logo */}
          <div className="mx-auto w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <div className="text-center">
              <div className="text-white text-2xl font-bold mb-1">النور</div>
              <div className="w-16 h-8 bg-white/20 rounded-sm mx-auto flex items-center justify-center">
                <div className="w-12 h-6 bg-secondary rounded-sm"></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-secondary">AN - NOUR</h1>
            <p className="text-lg text-secondary/80 font-medium">SÉMINAIRE INTERCOMMUNAL DE FORMATION</p>
            <p className="text-lg text-secondary/80 font-medium">ISLAMIQUE ET MANAGÉRIALE</p>
            <p className="text-primary font-medium mt-4 italic">An Nour, pour une spiritualité étincelante.</p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-white text-lg font-bold">النور</div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary">AN - NOUR</h1>
              <p className="text-sm text-muted-foreground">An Nour, pour une spiritualité étincelante.</p>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
