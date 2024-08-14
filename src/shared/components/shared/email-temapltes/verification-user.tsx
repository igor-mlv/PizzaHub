import React from 'react';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Confirmation code: <h2>{code}</h2>
    </p>

    <p>

      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?code=${code}`}>Confirm registration</a>
    </p>

  </div>
);
