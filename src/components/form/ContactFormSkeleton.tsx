export function ContactFormSkeleton() {
  return (
    <div className="space-y-5" aria-hidden="true">
      <SkeletonField labelWidth="w-12" inputHeight="h-[38px]" />
      <SkeletonField labelWidth="w-14" inputHeight="h-[38px]" />
      <SkeletonField labelWidth="w-20" inputHeight="h-[152px]" />
      <div className="h-[36px] w-[120px] rounded-md bg-bg-elevated" />
    </div>
  );
}

function SkeletonField({
  labelWidth,
  inputHeight,
}: {
  labelWidth: string;
  inputHeight: string;
}) {
  return (
    <div>
      <div className={`mb-1.5 h-3 ${labelWidth} rounded bg-bg-elevated`} />
      <div className={`w-full rounded-md border border-border bg-bg-elevated ${inputHeight}`} />
    </div>
  );
}
