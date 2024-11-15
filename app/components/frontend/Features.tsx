import { CloudRain, Zap, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    name: 'Sign up for free',
    description:
      'Get started with our platform at no cost. Experience the power of effortless blogging without any financial commitment.',
    icon: Sparkles,
    color: 'text-yellow-500',
    gradient: 'from-yellow-500/20 to-transparent',
  },
  {
    name: 'Blazing fast',
    description:
      'Enjoy lightning-quick performance. Our optimized platform ensures your blog loads in the blink of an eye, keeping your readers engaged.',
    icon: Zap,
    color: 'text-blue-500',
    gradient: 'from-blue-500/20 to-transparent',
  },
  {
    name: 'Super secure with Kinde',
    description:
      "Rest easy knowing your data is protected. We leverage Kinde's robust security measures to keep your information safe and sound.",
    icon: Shield,
    color: 'text-green-500',
    gradient: 'from-green-500/20 to-transparent',
  },
  {
    name: 'Easy to use',
    description:
      'Intuitive interface designed for bloggers of all levels. Create, manage, and publish your content with ease and confidence.',
    icon: CloudRain,
    color: 'text-purple-500',
    gradient: 'from-purple-500/20 to-transparent',
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
          Blog Faster
        </p>
        <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
          Get your blog up and running{' '}
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            in minutes
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Create your dream blog effortlessly. Our platform streamlines the process, allowing you to
          focus on what matters most – your content.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.name}
                className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b p-8"
                style={{
                  backgroundImage: `radial-gradient(circle at top left, ${feature.gradient})`,
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{feature.name}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
