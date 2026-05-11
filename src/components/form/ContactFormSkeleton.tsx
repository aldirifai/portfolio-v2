export function ContactFormSkeleton() {
  return (
    <div className="space-y-5" aria-hidden="true">
      <div className="grid gap-5 sm:grid-cols-2">
        <SkeletonField labelWidth="w-12" inputHeight="h-[46px]" />
        <SkeletonField labelWidth="w-14" inputHeight="h-[46px]" />
      </div>
      <SkeletonField labelWidth="w-20" inputHeight="h-[152px]" />
      <div className="h-12 w-[140px] rounded-xl bg-bg-elevated/40" />
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
      <div className={`mb-2 h-3 ${labelWidth} rounded bg-bg-elevated/40`} />
      <div
        className={`w-full rounded-xl border border-border bg-bg-elevated/30 ${inputHeight}`}
      />
    </div>
  );
}
