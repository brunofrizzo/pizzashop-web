import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from "react-router-dom";

const signupForm = z.object({
    email: z.string().email(),
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
});

type SignupForm = z.infer<typeof signupForm>;

export function Signup() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<SignupForm>();

    async function handleSignup(data: SignupForm) {
        console.log(data);
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Restaurante cadastrado com sucesso', {
            action: {
                label: 'Login',
                onClick: () => navigate('/sign-in')
            }
        });
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <Button variant="ghost" asChild className="absolute right-8 top-8">
                <Link to="/sign-in">
                    Fazer login
                </Link>
            </Button>

            <div className="p-8">
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">
                            Seja um parceiro e começe suas vendas
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignup)}>
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                            <Input id="restaurantName" type="text" {...register('restaurantName')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input id="managerName" type="text" {...register('managerName')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu celular</Label>
                            <Input id="phone" type="tel" {...register('phone')} />
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            Finalizar cadastro
                        </Button>

                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos <a href="#" className="underline">Termos de uso</a> e {' '}
                            <a href="#" className="underline">Política de privacidade</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}