import { CloudRain } from 'lucide-react';

const features = [
  {
    name: 'Sign up for free',
    description:
      'Get started with our platform at no cost. Experience the power of effortless blogging without any financial commitment.',
    icon: CloudRain,
  },
  {
    name: 'Balzing fast',
    description:
      'Enjoy lightning-quick performance. Our optimized platform ensures your blog loads in the blink of an eye, keeping your readers engaged.',
    icon: CloudRain,
  },
  {
    name: 'Super secure with Kinde',
    description:
      'Rest easy knowing your data is protected. We leverage Kinde s robust security measures to keep your information safe and sound.',
    icon: CloudRain,
  },
  {
    name: 'Easy to use',
    description:
      'Intuitive interface designed for bloggers of all levels. Create, manage, and publish your content with ease and confidence.',
    icon: CloudRain,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Blog Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Get your blog up and running in minutes
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Create your dream blog effortlessly. Our platform streamlines the process, allowing you to
          focus on what matters most – your content. Start sharing your ideas with the world today.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
