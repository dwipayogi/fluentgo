import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";

interface VerificationFormProps {
  onVerify: (code: string) => Promise<void>;
  onResendCode: () => Promise<void>;
  error: string;
  loading: boolean;
}

export function VerificationForm({
  onVerify,
  onResendCode,
  error,
  loading,
}: VerificationFormProps) {
  const [code, setCode] = useState("");
  const [resendingCode, setResendingCode] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    await onVerify(code);
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    setResendingCode(true);
    await onResendCode();
    setCode("");
    setCountdown(30);
    setResendingCode(false);
  };

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={setCode}
          value={code}
          autoFocus
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <Button
        onClick={handleVerify}
        className="w-full"
        disabled={loading || code.length < 6}
      >
        {loading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" /> : "Verify Email"}
      </Button>

      <Button
        variant="outline"
        onClick={handleResendCode}
        className="w-full"
        disabled={resendingCode || countdown > 0}
      >
        {resendingCode
          ? "Sending..."
          : countdown > 0
          ? `Resend Available in ${countdown}s`
          : "Resend Verification Code"}
      </Button>
    </>
  );
}
