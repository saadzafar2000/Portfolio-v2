import {
  Bot,
  ChevronDown,
  Code2,
  Copy,
  Cpu,
  MessageSquare,
  Plus,
  Send,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";

export default function AIDashboardDemo() {
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen bg-[#05070A] text-slate-100 font-sans overflow-hidden antialiased">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#090C12] flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-semibold text-xs tracking-wider uppercase text-white font-mono">Cognit AI</h1>
              <p className="text-[10px] text-slate-400 font-mono">Developer Workspace</p>
            </div>
          </div>

          <div className="p-3">
            <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30 px-3 py-2 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-all">
              <Plus className="h-3.5 w-3.5" />
              New Session
            </button>
          </div>

          <div className="px-3 py-2">
            <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
              Recent Conversations
            </p>
            <nav className="space-y-1">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 text-xs text-white font-medium border border-white/10">
                <MessageSquare className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Next.js 16 Server Actions API</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-400">
                <MessageSquare className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                <span className="truncate">Solidity Gas Optimization Pass</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-400">
                <MessageSquare className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                <span className="truncate">PostgreSQL Index Tuning</span>
              </div>
            </nav>
          </div>
        </div>

        <div className="p-3 border-t border-white/10 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-[11px] font-mono text-cyan-400 font-bold">
              SZ
            </div>
            <div>
              <p className="text-xs font-medium text-slate-200">Muhammad Saad</p>
              <p className="text-[10px] text-slate-500 font-mono">Pro Tier API</p>
            </div>
          </div>
          <Settings className="h-4 w-4 text-slate-500 hover:text-white cursor-pointer" />
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col bg-[#05070A]">
        {/* Top Navbar */}
        <header className="h-14 border-b border-white/10 bg-[#090C12] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              <span>claude-3-5-sonnet</span>
              <ChevronDown className="h-3 w-3 text-slate-500 ml-1" />
            </div>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Streaming (148 t/s)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>Tokens: <strong className="text-cyan-400">2,410 / 128k</strong></span>
            <span className="h-3 w-px bg-white/10" />
            <span>Latency: <strong className="text-emerald-400">182ms</strong></span>
          </div>
        </header>

        {/* Content Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto w-full">
          {/* User Message */}
          <div className="flex justify-end gap-3">
            <div className="max-w-xl bg-cyan-500/10 border border-cyan-500/30 rounded-2xl rounded-tr-sm px-4 py-3 text-xs text-slate-200 leading-relaxed shadow-sm">
              How do I write an async API route in Next.js 16 with error boundaries and typed JSON responses?
            </div>
            <div className="h-7 w-7 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[10px] font-mono text-cyan-400 font-bold shrink-0">
              YOU
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-full bg-cyan-500 border border-cyan-300 flex items-center justify-center text-slate-950 shrink-0 shadow-md shadow-cyan-500/20">
              <Bot className="h-4 w-4" />
            </div>
            <div className="max-w-2xl space-y-3">
              <div className="bg-[#090C12] border border-white/10 rounded-2xl rounded-tl-sm p-4 text-xs text-slate-300 space-y-3 shadow-xl">
                <p className="leading-relaxed">
                  In Next.js 16 (App Router), use `NextResponse.json()` with TypeScript generics for static type safety:
                </p>

                {/* Code Box */}
                <div className="rounded-lg overflow-hidden border border-white/10 bg-[#030407] font-mono text-[11px]">
                  <div className="bg-white/5 px-3 py-1.5 flex items-center justify-between border-b border-white/10 text-slate-400">
                    <span className="flex items-center gap-1.5 text-cyan-400 text-[11px]">
                      <Code2 className="h-3.5 w-3.5" /> app/api/user/route.ts
                    </span>
                    <button className="flex items-center gap-1 hover:text-white text-[10px]">
                      <Copy className="h-3 w-3" /> Copy
                    </button>
                  </div>
                  <pre className="p-3 text-slate-200 leading-normal">
{`import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = { status: "success", timestamp: Date.now() };
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}`}
                  </pre>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  <span>Returns structured JSON with automatic headers and HTTP status codes.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 max-w-4xl mx-auto w-full mb-4">
          <div className="flex items-center gap-3 bg-[#090C12] border border-white/10 rounded-xl p-3 shadow-2xl">
            <input
              type="text"
              readOnly
              value="Add type safety for POST request payload validation..."
              className="flex-1 bg-transparent text-xs text-slate-300 font-mono outline-none"
            />
            <button className="h-8 w-8 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
