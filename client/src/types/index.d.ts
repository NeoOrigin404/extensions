interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ExtensionType {
  id: number;
  logo: string;
  name: string;
  description: string;
  is_premium: boolean;
  is_active: boolean;
}

interface ExtensionsProps {
  extension: ExtensionType;
}

interface ToggleButtonProps {
  onToggle?: (isActive: boolean) => void;
}
