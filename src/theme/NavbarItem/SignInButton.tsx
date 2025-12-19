import ButtonLink from '@/components/ui/ButtonLink';

export default function SignInButton() {
  return (
    <ButtonLink
      size="sm"
      variant="outline"
      href="https://app.gruntwork.io"
      className="mx-3 my-2"
      id="navbar-sign-in"
      buttonClassName="text-[0.8rem] tracking-[-0.01em]"
    >
      Sign In
    </ButtonLink>
  );
}

