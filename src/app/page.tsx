"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginUser } from "./actions"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoaderCircle, Instagram, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useRouter } from 'next/navigation'


const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(1, { message: 'Password field must not be empty.' }),
});
  
type FormValues = z.infer<typeof LoginFormSchema>

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  
  const loginForm = useForm<FormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
        email: '',
        password: ''
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
        loginForm.clearErrors("root")
        
        const response = await loginUser(data);

        if(response.success == false){
          loginForm.setError("root", {
            type: "manual",
            message: "Failed to login. Please try again!"
          })
        } else {
          router.push("/dashboard");
        }

          
    } catch (error) {
      
      console.log(error)
      loginForm.setError("root", {
        type: "manual",
        message: "Failed to login. Please try again!"
      })

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Instagram Content Analyzer account</p>
        </div>

        {/* Sign In Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <FormField
                      control={loginForm.control}
                      name="email"
                      render={({field}) => (
                      <FormItem>
                          <FormLabel>
                          Email
                          </FormLabel>
                          <FormControl>
                              <Input {...field} type="email" placeholder="admin@example.com"/>
                          </FormControl>
                          <FormMessage/>
                      </FormItem>
                      )}  
                  />
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <FormField
                        control={loginForm.control}
                        name="password"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>
                            Password
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter your password" type={showPassword ? "text" : "password"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}  
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-2 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loginForm.formState.isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="text-white bg-emerald-500 hover:bg-emerald-800 w-full h-11"
                  type="submit"
                  disabled={loginForm.formState.isSubmitting}
                  >
                      {loginForm.formState.isSubmitting === true && (
                          <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      Sign In with Email
                </Button>

                {loginForm.formState.errors.root && (
                  <p className="text-sm font-medium text-destructive">
                    {loginForm.formState.errors.root.message}
                  </p>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer */}
        {/* <div className="text-center text-sm text-muted-foreground">
          <p>
            By signing in, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
          </p>
        </div> */}
      </div>
    </div>
  )
}
