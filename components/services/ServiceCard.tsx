import type { Service } from "@/lib/services";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const Icon = service.icon;

  return (
    <div className="flex flex-col border-t border-border px-1 py-10 md:flex-row md:gap-12 md:py-14">
      <div className="flex flex-none items-start gap-4 md:w-[38%]">
        <span
          aria-hidden="true"
          className="select-none font-display font-semibold leading-none text-border"
          style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
        >
          {num}
        </span>
        <div className="mt-1.5 flex items-center gap-2.5">
          <Icon size={18} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
          <h2 className="font-display text-h2 font-semibold">{service.name}</h2>
        </div>
      </div>

      <div className="mt-6 max-w-[52ch] md:mt-0">
        <p className="text-body-lg text-muted">{service.description}</p>
        <ul className="mt-5 grid gap-2">
          {service.details.map((detail) => (
            <li
              key={detail}
              className="flex items-start gap-2 text-[0.875rem] text-muted"
            >
              <span aria-hidden="true" className="mt-2 h-1 w-1 flex-none bg-muted" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
