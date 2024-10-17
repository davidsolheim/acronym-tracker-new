import { getProviders, signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default async function SignIn() {
  const providers = await getProviders()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="mb-4">
            <Button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}