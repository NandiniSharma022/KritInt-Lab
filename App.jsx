import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  MessageSquare,
  Cpu,
  Store,
  FileText,
  Settings,
  Plus,
  Search,
  Globe,
  Columns,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Paperclip,
  Send,
  Sparkles,
  Check,
  Download,
  ExternalLink,
  ChevronDown,
  Terminal,
  HardDrive,
  Activity,
  Zap,
  Sliders,
  Eye,
  X,
  Copy,
  CheckCircle2,
  FolderOpen,
  FileSpreadsheet,
  Presentation,
  FileImage,
  File,
  Shield,
  Layers,
  Menu,
} from "lucide-react";

// --- BRAND LOGO COMPONENT ---
const KrintIntLogo = ({ size = 26, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="KrintInt Labs Geometric Vortex Logo"
  >
    <rect width="36" height="36" rx="9" fill="#4B6BF6" fillOpacity="0.14" />
    <path
      d="M18 6C24.6274 6 30 11.3726 30 18C30 20.415 29.286 22.663 28.057 24.545C27.27 20.12 23.405 16.75 18.75 16.75C16.12 16.75 13.74 17.82 12.03 19.55C11.45 17.92 11.25 16.12 11.55 14.3C12.35 9.52 16.58 6 21.45 6H18Z"
      fill="#4B6BF6"
    />
    <path
      d="M30 18C30 24.6274 24.6274 30 18 30C15.585 30 13.337 29.286 11.455 28.057C15.88 27.27 19.25 23.405 19.25 18.75C19.25 16.12 18.18 13.74 16.45 12.03C18.08 11.45 19.88 11.25 21.7 11.55C26.48 12.35 30 16.58 30 21.45V18Z"
      fill="#4B6BF6"
      fillOpacity="0.82"
    />
    <path
      d="M18 30C11.3726 30 6 24.6274 6 18C6 15.585 6.714 13.337 7.943 11.455C8.73 15.88 12.595 19.25 17.25 19.25C19.88 19.25 22.26 18.18 23.97 16.45C24.55 18.08 24.75 19.88 24.45 21.7C23.65 26.48 19.42 30 14.55 30H18Z"
      fill="#4B6BF6"
      fillOpacity="0.65"
    />
    <path
      d="M6 18C6 11.3726 11.3726 6 18 6C20.415 6 22.663 6.714 24.545 7.943C20.12 8.73 16.75 12.595 16.75 17.25C16.75 19.88 17.82 22.26 19.55 23.97C17.92 24.55 16.12 24.75 14.3 24.45C9.52 23.65 6 19.42 6 14.55V18Z"
      fill="#4B6BF6"
      fillOpacity="0.92"
    />
    <circle cx="18" cy="18" r="2.6" fill="#FFFFFF" />
  </svg>
);

// --- INITIAL MOCK DATA ---
const INITIAL_MODELS = [
  {
    id: "llama-3.2-8b",
    name: "Llama 3.2 8B Instruct",
    provider: "Meta Local",
    quant: "Q4_K_M",
    ramGb: 5.2,
    speed: "94 tok/s",
    context: "128K",
    tag: "Balanced General",
    active: true,
  },
  {
    id: "qwen-2.5-coder-14b",
    name: "Qwen 2.5 Coder 14B",
    provider: "Alibaba Cloud Local",
    quant: "Q4_K_S",
    ramGb: 8.9,
    speed: "62 tok/s",
    context: "64K",
    tag: "Code & Architecture",
    active: false,
  },
  {
    id: "mistral-nemo-12b",
    name: "Mistral Nemo 12B",
    provider: "Mistral AI",
    quant: "Q5_K_M",
    ramGb: 7.8,
    speed: "71 tok/s",
    context: "128K",
    tag: "Reasoning & Drafting",
    active: false,
  },
  {
    id: "deepseek-r1-distill-8b",
    name: "DeepSeek R1 Distill 8B",
    provider: "DeepSeek Local",
    quant: "Q6_K",
    ramGb: 6.4,
    speed: "85 tok/s",
    context: "64K",
    tag: "Chain-of-Thought",
    active: false,
  },
];

const INITIAL_STORE_MODELS = [
  {
    id: "gemma-3-12b-it",
    name: "Gemma 3 12B Vision-IT",
    author: "Google DeepMind",
    size: "7.4 GB",
    ramReq: 7.9,
    quant: "Q4_K_M",
    price: "Free",
    isFree: true,
    license: "Open Weights",
    description:
      "Multimodal local model optimized for document extraction, structured tables, and crisp summarization.",
    specs: [
      "128K Context Window",
      "Native Vision Encoder",
      "82 tok/s on RTX 5060",
    ],
  },
  {
    id: "krintint-pro-coder-16b",
    name: "KrintInt Enterprise Coder 16B",
    author: "KrintInt Labs Official",
    size: "9.6 GB",
    ramReq: 10.2,
    quant: "Q5_K_M",
    price: "$29",
    isFree: false,
    license: "Commercial Pro",
    description:
      "Fine-tuned by KrintInt Labs on deterministic TypeScript, Rust, and FastAPI systems with zero-hallucination schema enforcement.",
    specs: [
      "128K Context Window",
      "JSON Schema Grammar Lock",
      "68 tok/s on RTX 5060",
    ],
  },
  {
    id: "phi-4-reasoning-14b",
    name: "Phi-4 Reasoning Plus 14B",
    author: "Microsoft Research",
    size: "8.3 GB",
    ramReq: 8.8,
    quant: "Q4_K_M",
    price: "Free",
    isFree: true,
    license: "MIT License",
    description:
      "Compact high-density reasoning engine specialized in formal mathematics, financial modeling, and algorithm verification.",
    specs: [
      "32K Context Window",
      "Symbolic Verification",
      "74 tok/s on RTX 5060",
    ],
  },
  {
    id: "krintint-legal-analyst-8b",
    name: "KrintInt Contract & Compliance 8B",
    author: "KrintInt Labs Official",
    size: "5.1 GB",
    ramReq: 5.5,
    quant: "Q6_K",
    price: "$19",
    isFree: false,
    license: "Enterprise Seat",
    description:
      "Air-gapped contract redlining, NDA clause auditing, and SOC2 compliance mapping built for zero-data-egress workflows.",
    specs: [
      "64K Context Window",
      "Air-Gapped Citation Index",
      "96 tok/s on RTX 5060",
    ],
  },
];

const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Q3_Enterprise_Pitch_Deck.pptx",
    category: "PPT",
    size: "4.8 MB",
    updated: "2 hours ago",
    pages: "18 Slides",
    summary:
      "Executive narrative covering KrintInt Labs local inference architecture, unit economics, and enterprise hybrid deployment roadmap.",
    previewBlocks: [
      "Slide 01 — KrintInt Labs: Private Intelligence at Edge Speed",
      "Slide 04 — Why Hybrid Local Runtimes Cut Cloud Inference Spend by 78%",
      "Slide 09 — Benchmark: Sub-18ms Time-to-First-Token on Consumer RTX GPUs",
    ],
  },
  {
    id: "doc-2",
    title: "GPU_Inference_Cost_Model_2026.xlsx",
    category: "Excel",
    size: "1.2 MB",
    updated: "Yesterday",
    pages: "4 Sheets",
    summary:
      "5-year TCO sensitivity workbook comparing on-prem RTX 5060 workstation clusters against metered API token billing.",
    previewBlocks: [
      "Sheet: TCO_Comparison | Local Workstation CapEx: $1,850 | Break-even: 3.4 Months",
      "Sheet: Token_Throughput | Avg Daily Tokens: 1.4M | Effective Cost: $0.00012 / 1K",
      "Sheet: Power_Envelope | Idle: 14W | Sustained Load: 115W",
    ],
  },
  {
    id: "doc-3",
    title: "FastAPI_Microservice_RFC.docx",
    category: "Docs",
    size: "640 KB",
    updated: "3 days ago",
    pages: "11 Pages",
    summary:
      "Technical specification detailing async streaming SSE endpoints, worker pool isolation, and zero-copy tensor serialization.",
    previewBlocks: [
      "1.0 Overview — Decoupling HTTP ingestion from C++ GGML worker threads",
      "2.1 Backpressure — Bounded asyncio.Queue with graceful 429 shedding",
      "3.4 Telemetry — Prometheus histograms for TTFT and inter-token latency",
    ],
  },
  {
    id: "doc-4",
    title: "SOC2_Local_Security_Audit.pdf",
    category: "PDF",
    size: "2.9 MB",
    updated: "Oct 28, 2026",
    pages: "34 Pages",
    summary:
      "Independent security attestation verifying zero external telemetry and encrypted local SQLite vector storage.",
    previewBlocks: [
      "Finding 01: Zero outbound sockets detected in Offline Runtime Mode",
      "Finding 02: Local weights verified via SHA-256 manifest signatures",
      "Certification Status: Compliant — Air-Gap Ready",
    ],
  },
  {
    id: "doc-5",
    title: "System_Architecture_Topology.png",
    category: "Images",
    size: "3.1 MB",
    updated: "Nov 02, 2026",
    pages: "3840 × 2160 px",
    summary:
      "High-resolution schematic illustrating the Omni-Bar browser sandbox bridge to the local inference engine.",
    previewBlocks: [
      "Layer 1: Sandboxed Chromium WebView with DOM Reader Extraction",
      "Layer 2: IPC Shared Ring Buffer (Zero-Copy Context Injection)",
      "Layer 3: KrintInt GGML / CUDA Tensor Execution Engine",
    ],
  },
  {
    id: "doc-6",
    title: "Board_KPI_Snapshot_Nov.xlsx",
    category: "Excel",
    size: "890 KB",
    updated: "Nov 14, 2026",
    pages: "3 Sheets",
    summary:
      "Monthly active workspaces, average session duration, and model store conversion metrics.",
    previewBlocks: [
      "Active Workspaces: 14,820 (+24% MoM)",
      "Avg Split-View Browser Sessions / User: 6.3 / day",
      "Model Store Attach Rate: 41.2%",
    ],
  },
];

const BROWSER_PRESETS = [
  {
    url: "https://github.com/krintint-labs/runtime",
    title: "krintint-labs/runtime — Ultra-low latency local inference engine",
    domain: "github.com",
    readTime: "4 min read",
    badge: "Repository • v2.4.1",
    heading: "KrintInt Local Runtime (C++20 / CUDA / Metal)",
    subtitle:
      "Deterministic local LLM execution engine powering private desktop workspaces with zero-copy context streaming.",
    highlights: [
      "Sub-15ms Time-to-First-Token (TTFT) on RTX 5060 with quantized KV-cache compression.",
      "Native DOM-to-Markdown context bridge allowing instant webpage reasoning inside Split View.",
      "Strict offline sandbox: zero outbound network calls when Hybrid Web Search is toggled off.",
    ],
    codeSnippet: `// Initialize KrintInt local engine with pinned VRAM buffer
krintint::EngineConfig cfg {
    .model_path = "~/.krintint/models/llama-3.2-8b.gguf",
    .gpu_layers = 33,
    .kv_cache_quant = krintint::QuantType::Q8_0,
    .offline_strict = true
};
auto runtime = krintint::Runtime::Create(cfg);`,
    metrics: [
      { label: "Stars", value: "18.4k" },
      { label: "Throughput", value: "94.2 tok/s" },
      { label: "VRAM Footprint", value: "5.2 GB" },
    ],
  },
  {
    url: "https://arxiv.org/abs/2604.08912",
    title: "[2604.08912] Adaptive KV-Cache Compression for Desktop SLMs",
    domain: "arxiv.org",
    readTime: "9 min read",
    badge: "Research Paper • CS.CL",
    heading:
      "Adaptive KV-Cache Compression for Long-Context Desktop Language Models",
    subtitle:
      "Authors: A. Verma, S. Lindqvist, M. Chen — KrintInt Labs Research Group (2026)",
    highlights: [
      "Introduces dynamic salience-aware token pruning that reduces 64K context memory overhead by 61.4%.",
      "Maintains 99.3% needle-in-a-haystack retrieval accuracy across multi-document technical synthesis.",
      "Enables simultaneous browser DOM indexing and code generation within 16 GB unified system RAM.",
    ],
    codeSnippet: `Table 2: Memory & Latency Benchmark (64K Context Window)
------------------------------------------------------------
Baseline FP16 KV-Cache : 14.8 GB VRAM | 28.4 tok/s
Standard INT8 Cache    :  7.6 GB VRAM | 54.1 tok/s
KrintInt Adaptive KV   :  5.7 GB VRAM | 81.6 tok/s (Ours)`,
    metrics: [
      { label: "Memory Saved", value: "61.4%" },
      { label: "Recall@64K", value: "99.3%" },
      { label: "Speedup", value: "2.87×" },
    ],
  },
  {
    url: "https://docs.python.org/3/library/asyncio.html",
    title: "asyncio — Asynchronous I/O — Python 3.14 Documentation",
    domain: "docs.python.org",
    readTime: "6 min read",
    badge: "Official Docs • stdlib",
    heading: "asyncio — Asynchronous I/O & Structured TaskGroups",
    subtitle:
      "Write concurrent single-threaded code using coroutines, multiplexing I/O access over sockets and local IPC pipes.",
    highlights: [
      "Use asyncio.TaskGroup() for structured concurrency with automatic cancellation propagation on sibling exceptions.",
      "Offload CPU-bound tokenization or synchronous C bindings via asyncio.to_thread() to prevent event loop starvation.",
      "Async generators enable zero-buffer Server-Sent Events (SSE) token streaming to desktop UI clients.",
    ],
    codeSnippet: `import asyncio

async def stream_tokens(queue: asyncio.Queue[str]):
    async with asyncio.TaskGroup() as tg:
        tg.create_task(produce_inference_chunks(queue))
        while (token := await queue.get()) is not None:
            yield f"data: {token}\\n\\n"`,
    metrics: [
      { label: "Python", value: "3.14+" },
      { label: "Loop Overhead", value: "< 0.2ms" },
      { label: "Concurrency", value: "TaskGroup" },
    ],
  },
];

const INITIAL_CHATS = [
  {
    id: "chat-1",
    title: "Python FastAPI Architecture",
    timestamp: "Today, 2:14 PM",
    messages: [
      {
        id: "m1",
        role: "user",
        content:
          "Design a clean, production-grade FastAPI folder structure for streaming local LLM tokens via SSE with backpressure handling.",
      },
      {
        id: "m2",
        role: "assistant",
        modelUsed: "Llama 3.2 8B Instruct",
        latency: "14ms TTFT • 92 tok/s",
        content: `Here is a modular FastAPI architecture tailored for low-latency local inference streaming:\n\n1. **API Layer (\`app/api/v1/chat.py\`)**: Exposes \`POST /completions\` returning \`StreamingResponse\` with \`text/event-stream\` and client disconnect detection.\n2. **Worker Bridge (\`app/core/engine.py\`)**: Uses a bounded \`asyncio.Queue(maxsize=128)\` to decouple the C++ runtime thread from the ASGI event loop.\n3. **Lifecycle Management**: Loads model weights once during \`lifespan\` startup to prevent per-request cold starts.`,
        code: `from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI(title="KrintInt Inference Gateway")

async def token_generator(request: Request, prompt: str):
    queue: asyncio.Queue[str | None] = asyncio.Queue(maxsize=64)
    # Dispatch local runtime worker
    asyncio.create_task(run_local_inference(prompt, queue))
    
    while True:
        if await request.is_disconnected():
            break
        chunk = await queue.get()
        if chunk is None:
            yield "data: [DONE]\\n\\n"
            break
        yield f"data: {chunk}\\n\\n"`,
      },
    ],
  },
  {
    id: "chat-2",
    title: "Q3 Pitch Deck Draft",
    timestamp: "Yesterday",
    messages: [
      {
        id: "m201",
        role: "user",
        content:
          "Draft a crisp 3-bullet executive problem statement for enterprise teams migrating sensitive workflows from cloud APIs to local desktop AI.",
      },
      {
        id: "m202",
        role: "assistant",
        modelUsed: "Mistral Nemo 12B",
        latency: "19ms TTFT • 71 tok/s",
        content: `Here is a sharp, board-ready problem framing:\n\n• **Data Sovereignty Bottleneck**: Regulated engineering, legal, and finance teams block 70%+ of high-value AI use cases due to third-party cloud egress policies.\n• **Unpredictable Token Economics**: Continuous agentic loops and document indexing turn per-token cloud APIs into an uncapped operational liability.\n• **Context Fragmentation**: Copy-pasting between browsers, local files, and chat windows destroys focus—unified desktop runtimes execute directly where work happens.`,
      },
    ],
  },
  {
    id: "chat-3",
    title: "Local LLM Quantization",
    timestamp: "Nov 16",
    messages: [
      {
        id: "m301",
        role: "user",
        content:
          "Compare Q4_K_M vs Q5_K_M quantization for an 8B parameter model running on an RTX 5060 with 16 GB system RAM.",
      },
      {
        id: "m302",
        role: "assistant",
        modelUsed: "Llama 3.2 8B Instruct",
        latency: "12ms TTFT • 95 tok/s",
        content: `For an **8B model** on an **RTX 5060**:\n\n• **Q4_K_M (~5.2 GB)**: Leaves ample headroom for a 32K–64K KV cache and desktop browser rendering while retaining ~98.6% of FP16 perplexity.\n• **Q5_K_M (~6.1 GB)**: Recovers subtle reasoning and code-syntax precision (+0.7% HumanEval) with only a ~9% reduction in tokens/sec.\n\n**Recommendation**: Default to \`Q4_K_M\` for daily multi-tasking in Split View, and switch to \`Q5_K_M\` or \`Qwen 2.5 Coder 14B\` for heavy refactoring.`,
      },
    ],
  },
  {
    id: "chat-4",
    title: "Edge Inference Benchmarks",
    timestamp: "Nov 12",
    messages: [
      {
        id: "m401",
        role: "user",
        content: "Summarize our target latency SLOs for the desktop client.",
      },
      {
        id: "m402",
        role: "assistant",
        modelUsed: "DeepSeek R1 Distill 8B",
        latency: "15ms TTFT • 85 tok/s",
        content: `Target Desktop Client SLOs:\n\n1. **UI Cold Boot**: < 450ms to interactive workspace\n2. **Time-to-First-Token (TTFT)**: < 25ms for prompts under 2,048 tokens\n3. **Sustained Generation**: ≥ 60 tok/s (exceeding human reading speed by 12×)\n4. **Page Context Extraction**: < 80ms from Split View DOM to prompt injection`,
      },
    ],
  },
];

export default function App() {
  // --- CORE BRAND & APP STATE ---
  const [aiName, setAiName] = useState("Kritint");
  const [draftAiName, setDraftAiName] = useState("Kritint");
  const [nameSavedBanner, setNameSavedBanner] = useState(false);

  // Navigation & View Modes
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'models' | 'store' | 'documents' | 'settings'
  const [workspaceMode, setWorkspaceMode] = useState("chat"); // 'chat' | 'browser' | 'split'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Models & System Health State
  const [models, setModels] = useState(INITIAL_MODELS);
  const [storeModels, setStoreModels] = useState(INITIAL_STORE_MODELS);
  const [installingId, setInstallingId] = useState(null);
  const [runtimeMode, setRuntimeMode] = useState("Hybrid"); // 'Offline' | 'Hybrid'

  // Chat State
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState("chat-1");
  const [promptInput, setPromptInput] = useState("");
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  // Browser State
  const [browserHistory, setBrowserHistory] = useState([
    BROWSER_PRESETS[0].url,
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [urlInput, setUrlInput] = useState(BROWSER_PRESETS[0].url);
  const [isRefreshingBrowser, setIsRefreshingBrowser] = useState(false);

  // Documents State
  const [docFilter, setDocFilter] = useState("All");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [downloadedDocId, setDownloadedDocId] = useState(null);

  // Settings / Inference Controls State
  const [temperature, setTemperature] = useState(0.35);
  const [maxTokens, setMaxTokens] = useState(8192);
  const [cpuThreads, setCpuThreads] = useState(12);
  const [systemPrompt, setSystemPrompt] = useState(
    `You are Kritint, a high-precision local AI assistant built by KrintInt Labs. Prioritize concise, well-structured engineering and analytical answers. Never fabricate citations.`,
  );
  const [settingsSavedBanner, setSettingsSavedBanner] = useState(false);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // --- DERIVED VALUES ---
  const activeModel = useMemo(
    () => models.find((m) => m.active) || models[0],
    [models],
  );

  const currentRamUsage = useMemo(() => {
    const baseSystemOverhead = 1.2;
    return (baseSystemOverhead + activeModel.ramGb).toFixed(1);
  }, [activeModel]);

  const activeChat = useMemo(
    () => chats.find((c) => c.id === activeChatId) || null,
    [chats, activeChatId],
  );

  const currentUrl = browserHistory[historyIndex] || BROWSER_PRESETS[0].url;

  const activePageData = useMemo(() => {
    const exact = BROWSER_PRESETS.find((p) =>
      currentUrl.toLowerCase().includes(p.domain),
    );
    if (exact) return exact;
    return {
      url: currentUrl,
      title: `${currentUrl.replace(/^https?:\/\//, "")} — Live Web Viewport`,
      domain:
        currentUrl.replace(/^https?:\/\//, "").split("/")[0] || "web.local",
      readTime: "3 min read",
      badge: "Live Web Page",
      heading: `Extracted Content: ${currentUrl.replace(/^https?:\/\//, "")}`,
      subtitle:
        "Rendered inside KrintInt Sandbox Browser with zero-copy DOM context bridge.",
      highlights: [
        "Clean reader-mode extraction active: navigation clutter and trackers stripped automatically.",
        "Ready for instant summarization, structured table extraction, or follow-up Q&A.",
        `Click "Ask ${aiName} about this page" in the Omni-Bar to synthesize key takeaways.`,
      ],
      codeSnippet: `// Extracted Page Metadata
{
  "source": "${currentUrl}",
  "sandbox": "KrintInt-WebView-Isolated",
  "tokens_indexed": 1420
}`,
      metrics: [
        { label: "Indexed", value: "1,420 tok" },
        { label: "Trackers", value: "0 Blocked" },
        { label: "Bridge", value: "Ready" },
      ],
    };
  }, [currentUrl, aiName]);

  const filteredDocuments = useMemo(() => {
    if (docFilter === "All") return INITIAL_DOCUMENTS;
    return INITIAL_DOCUMENTS.filter((d) => d.category === docFilter);
  }, [docFilter]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages?.length, isGenerating]);

  // --- HANDLERS ---
  const handleSelectModel = (modelId) => {
    setModels((prev) =>
      prev.map((m) => ({
        ...m,
        active: m.id === modelId,
      })),
    );
    setModelDropdownOpen(false);
  };

  const handleInstallStoreModel = (item) => {
    if (installingId) return;
    const alreadyInstalled = models.some((m) => m.id === item.id);
    if (alreadyInstalled) {
      handleSelectModel(item.id);
      setActiveTab("models");
      return;
    }

    setInstallingId(item.id);
    setTimeout(() => {
      const newModel = {
        id: item.id,
        name: item.name,
        provider: item.author,
        quant: item.quant,
        ramGb: item.ramReq,
        speed: "76 tok/s",
        context: "128K",
        tag: item.isFree ? "Store Verified" : "Licensed Pro",
        active: true,
      };
      setModels((prev) =>
        prev.map((m) => ({ ...m, active: false })).concat(newModel),
      );
      setInstallingId(null);
    }, 850);
  };

  const handleNewChat = () => {
    const newId = `chat-${Date.now()}`;
    const newChat = {
      id: newId,
      title: "New Workspace Session",
      timestamp: "Just now",
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newId);
    setActiveTab("chat");
    if (workspaceMode === "browser") {
      setWorkspaceMode("chat");
    }
    setMobileSidebarOpen(false);
  };

  const generateSimulatedReply = (userText, pageContext = null) => {
    const lower = userText.toLowerCase();
    if (pageContext) {
      return `I analyzed **${pageContext.title}** (\`${pageContext.url}\`) directly from your Split View browser:\n\n• **Core Thesis**: ${pageContext.subtitle}\n• **Key Takeaways**:\n  1. ${pageContext.highlights[0]}\n  2. ${pageContext.highlights[1]}\n• **Metrics Captured**: ${pageContext.metrics
        .map((m) => `${m.label}: **${m.value}**`)
        .join(
          " · ",
        )}\n\nWould you like me to export this synthesis into a structured Markdown brief or table?`;
    }
    if (
      lower.includes("code") ||
      lower.includes("python") ||
      lower.includes("api") ||
      lower.includes("script")
    ) {
      return `Running locally on **${activeModel.name}** (\`temp=${temperature}\`, \`${cpuThreads} threads\`):\n\nHere is a clean, deterministic implementation designed for zero-overhead execution:\n\n• Uses strict type annotations and structured error boundaries.\n• Zero external network dependencies—safe for **${runtimeMode}** runtime mode.`;
    }
    return `Processed locally via **${activeModel.name}** (${activeModel.quant}) with **${currentRamUsage} GB** unified RAM allocated:\n\n• **Direct Answer**: Based on your workspace configuration (\`Max Tokens: ${maxTokens.toLocaleString()}\`, \`Temp: ${temperature}\`), I have structured a concise breakdown for **"${userText.slice(0, 64)}${userText.length > 64 ? "..." : ""}"**.\n• **Next Steps**: You can open **Split View** in the Omni-Bar to cross-reference live web documentation alongside this thread, or save this output directly to **Documents**.`;
  };

  const handleSendMessage = (customPrompt = null, pageContext = null) => {
    const textToSend = (
      customPrompt !== null ? customPrompt : promptInput
    ).trim();
    if (!textToSend || isGenerating) return;

    let targetChatId = activeChatId;
    let updatedChats = [...chats];

    if (!targetChatId || !updatedChats.some((c) => c.id === targetChatId)) {
      targetChatId = `chat-${Date.now()}`;
      updatedChats.unshift({
        id: targetChatId,
        title: textToSend.slice(0, 32) + (textToSend.length > 32 ? "..." : ""),
        timestamp: "Just now",
        messages: [],
      });
      setActiveChatId(targetChatId);
    }

    const userMessage = {
      id: `msg-u-${Date.now()}`,
      role: "user",
      content: textToSend,
      attachment: attachedFile,
      webSearch: webSearchEnabled,
    };

    updatedChats = updatedChats.map((chat) => {
      if (chat.id !== targetChatId) return chat;
      const isFirstMessage = chat.messages.length === 0;
      return {
        ...chat,
        title: isFirstMessage
          ? textToSend.slice(0, 34) + (textToSend.length > 34 ? "..." : "")
          : chat.title,
        timestamp: "Just now",
        messages: [...chat.messages, userMessage],
      };
    });

    setChats(updatedChats);
    if (customPrompt === null) setPromptInput("");
    setAttachedFile(null);
    setIsGenerating(true);

    setTimeout(() => {
      const assistantMessage = {
        id: `msg-a-${Date.now()}`,
        role: "assistant",
        modelUsed: activeModel.name,
        latency: `15ms TTFT • ${activeModel.speed}`,
        content: generateSimulatedReply(textToSend, pageContext),
        code:
          textToSend.toLowerCase().includes("code") ||
          textToSend.toLowerCase().includes("api") ||
          textToSend.toLowerCase().includes("script")
            ? `def execute_local_pipeline(payload: dict) -> dict:
    # Deterministic local execution via KrintInt Runtime
    verified = {k: v for k, v in payload.items() if v is not None}
    return {"status": "ok", "engine": "${activeModel.id}", "items": len(verified)}`
            : null,
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === targetChatId
            ? { ...chat, messages: [...chat.messages, assistantMessage] }
            : chat,
        ),
      );
      setIsGenerating(false);
    }, 550);
  };

  // --- BROWSER NAVIGATION HANDLERS ---
  const navigateToUrl = (rawUrl) => {
    let formatted = rawUrl.trim();
    if (!formatted) return;
    if (!/^https?:\/\//i.test(formatted)) {
      if (formatted.includes(".") && !formatted.includes(" ")) {
        formatted = `https://${formatted}`;
      } else {
        formatted = `https://search.krintint.local/?q=${encodeURIComponent(formatted)}`;
      }
    }
    const nextHistory = browserHistory
      .slice(0, historyIndex + 1)
      .concat(formatted);
    setBrowserHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setUrlInput(formatted);
    if (workspaceMode === "chat") {
      setWorkspaceMode("split");
    }
  };

  const handleBrowserBack = () => {
    if (historyIndex > 0) {
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      setUrlInput(browserHistory[nextIdx]);
    }
  };

  const handleBrowserForward = () => {
    if (historyIndex < browserHistory.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setUrlInput(browserHistory[nextIdx]);
    }
  };

  const handleBrowserRefresh = () => {
    setIsRefreshingBrowser(true);
    setTimeout(() => setIsRefreshingBrowser(false), 350);
  };

  const handleAskAboutPage = () => {
    setActiveTab("chat");
    setWorkspaceMode("split");
    handleSendMessage(
      `Summarize key insights and extract technical metrics from ${activePageData.url}`,
      activePageData,
    );
  };

  // --- SETTINGS SAVE HANDLERS ---
  const handleSaveAiName = (e) => {
    e.preventDefault();
    const cleaned = draftAiName.trim();
    if (!cleaned) return;
    setAiName(cleaned);
    setSystemPrompt((prev) =>
      prev.replace(/You are [A-Za-z0-9 _-]+,/, `You are ${cleaned},`),
    );
    setNameSavedBanner(true);
    setTimeout(() => setNameSavedBanner(false), 2400);
  };

  const handleCopyText = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 1800);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "PPT":
        return <Presentation className="w-4 h-4 text-[#4B6BF6]" />;
      case "Excel":
        return <FileSpreadsheet className="w-4 h-4 text-[#0B0D12]" />;
      case "Docs":
        return <FileText className="w-4 h-4 text-[#4B6BF6]" />;
      case "PDF":
        return <File className="w-4 h-4 text-[#0B0D12]" />;
      case "Images":
        return <FileImage className="w-4 h-4 text-[#4B6BF6]" />;
      default:
        return <FolderOpen className="w-4 h-4 text-[#0B0D12]" />;
    }
  };

  // --- RENDER: INTEGRATED BROWSER VIEWPORT ---
  const renderBrowserViewport = () => (
    <div className="flex flex-col h-full bg-white select-text">
      {/* Browser Sub-bar / Quick Presets */}
      <div className="px-4 py-2 border-b border-[#E5E7EB] bg-[#FAFAFB] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 mr-1">
            Pinned:
          </span>
          {BROWSER_PRESETS.map((preset) => {
            const isCurrent = currentUrl === preset.url;
            return (
              <button
                key={preset.url}
                onClick={() => navigateToUrl(preset.url)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                  isCurrent
                    ? "bg-[#0B0D12] text-white"
                    : "bg-white text-neutral-600 border border-[#E5E7EB] hover:border-neutral-400"
                }`}
              >
                {preset.domain}
              </button>
            );
          })}
        </div>
        <span className="text-[11px] text-neutral-500 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#4B6BF6]" />
          DOM Context Bridge Active
        </span>
      </div>

      {/* Simulated Webpage Body */}
      <div
        className={`flex-1 overflow-y-auto p-6 md:p-8 transition-opacity duration-200 ${
          isRefreshingBrowser ? "opacity-40" : "opacity-100"
        }`}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4B6BF6]/10 text-[#4B6BF6]">
                {activePageData.badge}
              </span>
              <span className="text-xs text-neutral-400">
                {activePageData.readTime}
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-400 truncate max-w-[200px]">
              {activePageData.domain}
            </span>
          </div>

          <div className="space-y-2.5">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0B0D12]">
              {activePageData.heading}
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {activePageData.subtitle}
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-3 gap-3">
            {activePageData.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FAFAFB]"
              >
                <div className="text-[11px] uppercase tracking-wider text-neutral-500">
                  {metric.label}
                </div>
                <div className="text-base font-semibold text-[#0B0D12] mt-0.5">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Key Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Page Highlights & Technical Summary
            </h3>
            <ul className="space-y-2.5">
              {activePageData.highlights.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-[#0B0D12] leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-[#4B6BF6]/10 text-[#4B6BF6] text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Embedded Code / Spec Card */}
          <div className="rounded-xl border border-[#E5E7EB] overflow-hidden bg-[#0B0D12] text-neutral-100">
            <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono">excerpt.spec</span>
              <button
                onClick={() => handleAskAboutPage()}
                className="text-[#4B6BF6] hover:underline font-medium flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Analyze with {aiName}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto text-neutral-200">
              {activePageData.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  // --- RENDER: AI CHAT WORKSPACE ---
  const renderChatWorkspace = (compact = false) => {
    const messages = activeChat?.messages || [];

    return (
      <div className="flex flex-col h-full bg-[#B9C0E3]">
        {/* Chat Sub-header */}
        <div className="px-5 py-2.5 border-b border-[#E0E3F5] flex items-center justify-between bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#4B6BF6] shrink-0" />
            <span className="text-xs font-medium text-[#0B0D12] truncate">
              {activeChat?.title || `${aiName} Workspace`}
            </span>
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-mono">
              {activeModel.quant}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 font-mono">
            Temp {temperature.toFixed(2)} • {maxTokens.toLocaleString()} max
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 bg-[#DCE1F5]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-xl mx-auto text-center py-8">
              <div className="w-12 h-12 rounded-2xl bg-[#4B6BF6]/10 flex items-center justify-center mb-4">
                <KrintIntLogo size={30} />
              </div>
              <h1 className="text-2xl sm:text-[26px] font-semibold tracking-tight text-[#0B0D12]">
                How can {aiName} help you today?
              </h1>
              <p className="text-sm text-neutral-500 mt-2 max-w-md leading-relaxed">
                Running locally on{" "}
                <span className="text-[#0B0D12] font-medium">
                  {activeModel.name}
                </span>
                . Your prompts, files, and browser sessions stay private on your
                workstation.
              </p>

              {/* Quick Starter Prompts */}
              <div
                className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"} gap-2.5 w-full mt-7 text-left`}
              >
                {[
                  {
                    title: "Architect FastAPI SSE Stream",
                    prompt:
                      "Write a clean FastAPI async streaming endpoint for local LLM inference with backpressure.",
                  },
                  {
                    title: "Summarize Active Browser Page",
                    prompt: `Summarize key insights and extract technical metrics from ${activePageData.url}`,
                    isPageAction: true,
                  },
                  {
                    title: "Compare Local Quantization",
                    prompt:
                      "Compare Q4_K_M vs Q5_K_M memory and reasoning trade-offs on RTX 5060.",
                  },
                  {
                    title: "Draft Enterprise Security Brief",
                    prompt:
                      "Draft an executive summary on zero-egress air-gapped AI inference for compliance teams.",
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => {
                      if (item.isPageAction) {
                        handleAskAboutPage();
                      } else {
                        handleSendMessage(item.prompt);
                      }
                    }}
                    className="p-3.5 rounded-xl border border-[#E5E7EB] hover:border-[#4B6BF6] hover:bg-[#4B6BF6]/[0.02] transition-all group"
                  >
                    <div className="text-xs font-semibold text-[#0B0D12] group-hover:text-[#4B6BF6] flex items-center justify-between">
                      <span>{item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#4B6BF6]" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      {item.prompt}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {msg.role === "user" ? (
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#0B0D12] text-white px-4 py-3 text-sm leading-relaxed shadow-xs">
                      {msg.attachment && (
                        <div className="mb-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 text-[11px] font-mono">
                          <Paperclip className="w-3 h-3 text-[#4B6BF6]" />
                          {msg.attachment}
                        </div>
                      )}
                      <div>{msg.content}</div>
                    </div>
                  ) : (
                    <div className="w-full space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#4B6BF6]/10 flex items-center justify-center">
                            <KrintIntLogo size={16} />
                          </div>
                          <span className="text-xs font-semibold text-[#0B0D12]">
                            {aiName}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                            {msg.modelUsed || activeModel.name}
                          </span>
                          {msg.latency && (
                            <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">
                              {msg.latency}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleCopyText(msg.id, msg.content)}
                          className="text-xs text-neutral-400 hover:text-[#0B0D12] flex items-center gap-1 px-2 py-1 rounded-md hover:bg-neutral-100 transition-colors"
                          title="Copy response"
                        >
                          {copiedMessageId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#4B6BF6]" />
                              <span className="text-[#4B6BF6]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="pl-8 text-sm text-[#0B0D12] leading-relaxed whitespace-pre-line">
                        {msg.content}
                      </div>

                      {msg.code && (
                        <div className="pl-8">
                          <div className="rounded-xl border border-[#E5E7EB] bg-[#0B0D12] text-neutral-100 overflow-hidden">
                            <div className="px-3.5 py-1.5 border-b border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                              <span>python</span>
                              <button
                                onClick={() =>
                                  handleCopyText(`${msg.id}-code`, msg.code)
                                }
                                className="hover:text-white flex items-center gap-1"
                              >
                                <Copy className="w-3 h-3" />
                                Copy snippet
                              </button>
                            </div>
                            <pre className="p-3.5 text-xs font-mono overflow-x-auto leading-relaxed">
                              {msg.code}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isGenerating && (
                <div className="flex items-center gap-2.5 text-xs text-neutral-500 pl-1">
                  <div className="w-5 h-5 rounded-md bg-[#4B6BF6]/10 flex items-center justify-center animate-pulse">
                    <KrintIntLogo size={14} />
                  </div>
                  <span className="font-medium text-[#0B0D12]">{aiName}</span>
                  <span>is generating locally via {activeModel.name}...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Prompt Input Composer */}
        <div className="p-4 bg-white border-t border-[#C5CCE8]">
          <div className="max-w-2xl mx-auto">
            {attachedFile && (
              <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neutral-100 border border-[#E5E7EB] text-xs text-[#0B0D12]">
                <Paperclip className="w-3.5 h-3.5 text-[#4B6BF6]" />
                <span className="font-medium">{attachedFile}</span>
                <button
                  onClick={() => setAttachedFile(null)}
                  className="text-neutral-400 hover:text-[#0B0D12]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="rounded-2xl border border-[#E5E7EB] focus-within:border-[#4B6BF6] focus-within:ring-2 focus-within:ring-[#4B6BF6]/15 bg-white transition-all shadow-2xs">
              <textarea
                rows={2}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Message ${aiName}... (Press Enter to send, Shift+Enter for new line)`}
                className="w-full px-4 pt-3.5 pb-2 text-sm text-[#0B0D12] placeholder:text-neutral-400 bg-transparent resize-none focus:outline-none"
              />

              {/* Bottom Controls Toolbar */}
              <div className="px-3 pb-2.5 pt-1 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {/* Attachment Button */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setAttachedFile(file.name);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-lg text-neutral-500 hover:text-[#0B0D12] hover:bg-neutral-100 transition-colors"
                    title="Attach local document"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  {/* Web Search Toggle */}
                  <button
                    type="button"
                    onClick={() => setWebSearchEnabled((prev) => !prev)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border ${
                      webSearchEnabled
                        ? "bg-[#4B6BF6]/10 text-[#4B6BF6] border-[#4B6BF6]/30"
                        : "bg-white text-neutral-600 border-[#E5E7EB] hover:bg-neutral-50"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Web Search</span>
                  </button>

                  {/* Active Model Selector Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setModelDropdownOpen((prev) => !prev)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200/70 text-[#0B0D12] flex items-center gap-1.5 transition-colors"
                    >
                      <Cpu className="w-3.5 h-3.5 text-[#4B6BF6]" />
                      <span className="max-w-[130px] sm:max-w-[170px] truncate">
                        {activeModel.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                    </button>

                    {modelDropdownOpen && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 rounded-xl border border-[#E5E7EB] bg-white shadow-xl py-1.5 z-30">
                        <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                          Active Local Models
                        </div>
                        {models.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => handleSelectModel(m.id)}
                            className="w-full px-3 py-2 text-left hover:bg-neutral-50 flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-[#0B0D12] truncate">
                                {m.name}
                              </div>
                              <div className="text-[11px] text-neutral-500 font-mono">
                                {m.quant} • {m.ramGb} GB RAM
                              </div>
                            </div>
                            {m.active && (
                              <Check className="w-4 h-4 text-[#4B6BF6] shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!promptInput.trim() || isGenerating}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    promptInput.trim() && !isGenerating
                      ? "bg-[#4B6BF6] text-white hover:bg-[#3B5BE6] shadow-xs"
                      : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- RENDER: MODELS TAB ---
  const renderModelsView = () => (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
          <div>
            <h1 className="text-xl font-semibold text-[#0B0D12] tracking-tight">
              Installed Local Models
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Switch the active GGML/CUDA runtime engine powering{" "}
              <span className="text-[#0B0D12] font-medium">{aiName}</span>.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("store")}
            className="px-4 py-2 rounded-xl bg-[#4B6BF6] hover:bg-[#3B5BE6] text-white text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors"
          >
            <Store className="w-4 h-4" />
            Browse Model Store
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => handleSelectModel(model.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                model.active
                  ? "border-[#4B6BF6] bg-[#4B6BF6]/[0.02] ring-1 ring-[#4B6BF6]"
                  : "border-[#E5E7EB] bg-white hover:border-neutral-400"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#0B0D12]">
                      {model.name}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {model.provider} • {model.tag}
                  </p>
                </div>

                {/* Toggle Pill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectModel(model.id);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    model.active
                      ? "bg-[#4B6BF6] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {model.active ? "Active" : "Switch"}
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 text-[#0B0D12] font-mono font-medium">
                    {model.quant}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono">
                    {model.ramGb} GB RAM
                  </span>
                </div>
                <span className="font-mono text-neutral-500">
                  {model.speed} • {model.context}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- RENDER: MODEL STORE TAB ---
  const renderModelStoreView = () => (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B6BF6] mb-1">
              <Store className="w-3.5 h-3.5" />
              <span>KrintInt Verified Registry</span>
            </div>
            <h1 className="text-xl font-semibold text-[#0B0D12] tracking-tight">
              Local Model Store
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Download pre-quantized GGUF weights verified for RTX 5060 Tensor
              Cores.
            </p>
          </div>
          <div className="text-xs text-neutral-500 bg-neutral-100 px-3 py-2 rounded-xl font-mono">
            Storage Free: 312.4 GB NVMe
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {storeModels.map((item) => {
            const isInstalled = models.some((m) => m.id === item.id);
            const isDownloading = installingId === item.id;

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col justify-between hover:border-neutral-400 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-[#0B0D12]">
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        by {item.author} • {item.license}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.isFree
                          ? "bg-neutral-100 text-[#0B0D12]"
                          : "bg-[#4B6BF6]/10 text-[#4B6BF6]"
                      }`}
                    >
                      {item.price}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed mt-3">
                    {item.description}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    {item.specs.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center gap-2 text-xs text-neutral-600"
                      >
                        <Check className="w-3.5 h-3.5 text-[#4B6BF6] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
                  <div className="text-xs font-mono text-neutral-500">
                    {item.size} • {item.quant}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInstallStoreModel(item)}
                    disabled={isDownloading}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isInstalled
                        ? "bg-neutral-100 text-[#0B0D12] hover:bg-neutral-200"
                        : "bg-[#4B6BF6] text-white hover:bg-[#3B5BE6]"
                    }`}
                  >
                    {isDownloading ? (
                      <>
                        <RotateCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Downloading Weights...</span>
                      </>
                    ) : isInstalled ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6BF6]" />
                        <span>Installed • Activate</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>
                          {item.isFree
                            ? "Download Model"
                            : `Buy & Install (${item.price})`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // --- RENDER: DOCUMENTS TAB ---
  const renderDocumentsView = () => (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
          <div>
            <h1 className="text-xl font-semibold text-[#0B0D12] tracking-tight">
              AI-Generated Documents
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Structured artifacts synthesized by{" "}
              <span className="text-[#0B0D12] font-medium">{aiName}</span> in
              your local workspace.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {["All", "PPT", "Excel", "Docs", "PDF", "Images"].map((cat) => (
              <button
                key={cat}
                onClick={() => setDocFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  docFilter === cat
                    ? "bg-[#0B0D12] text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* File Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-2xl border border-[#E5E7EB] bg-white hover:border-[#4B6BF6] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                    {getCategoryIcon(doc.category)}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-100 text-neutral-700">
                    {doc.category}
                  </span>
                </div>

                <h3
                  className="text-sm font-semibold text-[#0B0D12] mt-3.5 truncate"
                  title={doc.title}
                >
                  {doc.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                  {doc.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">
                  {doc.size} • {doc.pages}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(doc)}
                    className="p-1.5 rounded-lg text-neutral-600 hover:text-[#4B6BF6] hover:bg-[#4B6BF6]/10 transition-colors"
                    title="Preview Document"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDownloadedDocId(doc.id);
                      setTimeout(() => setDownloadedDocId(null), 1600);
                    }}
                    className="p-1.5 rounded-lg text-neutral-600 hover:text-[#0B0D12] hover:bg-neutral-100 transition-colors"
                    title="Export Local File"
                  >
                    {downloadedDocId === doc.id ? (
                      <Check className="w-4 h-4 text-[#4B6BF6]" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Document Preview Modal */}
        {previewDoc && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-[#E5E7EB] pb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                    {getCategoryIcon(previewDoc.category)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#0B0D12] truncate">
                      {previewDoc.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {previewDoc.pages} • {previewDoc.size} • Updated{" "}
                      {previewDoc.updated}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-[#0B0D12] hover:bg-neutral-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                {previewDoc.summary}
              </p>

              <div className="rounded-xl bg-[#FAFAFB] border border-[#E5E7EB] p-4 space-y-2.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Extracted Artifact Outline
                </div>
                {previewDoc.previewBlocks.map((line, i) => (
                  <div
                    key={i}
                    className="text-xs font-mono text-[#0B0D12] bg-white p-2.5 rounded-lg border border-[#E5E7EB]"
                  >
                    {line}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    const docTitle = previewDoc.title;
                    setPreviewDoc(null);
                    setActiveTab("chat");
                    handleSendMessage(
                      `Analyze and expand on the findings inside ${docTitle}`,
                    );
                  }}
                  className="px-4 py-2 rounded-xl bg-[#4B6BF6] text-white text-xs font-semibold hover:bg-[#3B5BE6] flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Discuss with {aiName}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // --- RENDER: SETTINGS TAB ---
  const renderSettingsView = () => (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="border-b border-[#E5E7EB] pb-5">
          <h1 className="text-xl font-semibold text-[#0B0D12] tracking-tight">
            Workspace & Inference Settings
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Customize your KrintInt Labs assistant identity and local runtime
            parameters.
          </p>
        </div>

        {/* Section 1: AI Identity */}
        <form
          onSubmit={handleSaveAiName}
          className="p-6 rounded-2xl border border-[#E5E7EB] bg-white space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#0B0D12]">
                AI Assistant Identity
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Rename your assistant across the sidebar, Omni-Bar, and chat
                workspace in real-time.
              </p>
            </div>
            {nameSavedBanner && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#4B6BF6] bg-[#4B6BF6]/10 px-2.5 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
                Updated to "{aiName}"
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <input
              type="text"
              value={draftAiName}
              onChange={(e) => setDraftAiName(e.target.value)}
              placeholder="Enter assistant name (e.g. Kritint)"
              maxLength={24}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-medium text-[#0B0D12] focus:outline-none focus:border-[#4B6BF6] focus:ring-2 focus:ring-[#4B6BF6]/15"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#4B6BF6] hover:bg-[#3B5BE6] text-white text-xs font-semibold transition-colors shrink-0"
            >
              Save Name
            </button>
          </div>
        </form>

        {/* Section 2: Inference Controls */}
        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-white space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#0B0D12]">
                Local Inference Controls
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Fine-tune sampling behavior and hardware thread allocation for{" "}
                {activeModel.name}.
              </p>
            </div>
            {settingsSavedBanner && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#4B6BF6] bg-[#4B6BF6]/10 px-2.5 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
                Parameters Applied
              </span>
            )}
          </div>

          {/* Temperature Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-medium text-[#0B0D12]">
                Temperature / Creativity
              </label>
              <span className="font-mono font-semibold text-[#4B6BF6] bg-[#4B6BF6]/10 px-2 py-0.5 rounded">
                {temperature.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-[#4B6BF6] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>0.0 (Deterministic Code)</span>
              <span>0.5 (Balanced)</span>
              <span>1.0 (Exploratory)</span>
            </div>
          </div>

          {/* Max Tokens Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-medium text-[#0B0D12]">
                Max Output Tokens
              </label>
              <span className="font-mono font-semibold text-[#0B0D12] bg-neutral-100 px-2 py-0.5 rounded">
                {maxTokens.toLocaleString()} tokens
              </span>
            </div>
            <input
              type="range"
              min="512"
              max="32768"
              step="512"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
              className="w-full accent-[#4B6BF6] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>512</span>
              <span>16,384</span>
              <span>32,768</span>
            </div>
          </div>

          {/* Thread Allocation Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-medium text-[#0B0D12]">
                Token Generation Speed / CPU Thread Allocation
              </label>
              <span className="font-mono font-semibold text-[#0B0D12] bg-neutral-100 px-2 py-0.5 rounded">
                {cpuThreads} Threads (~{Math.round(52 + cpuThreads * 3.4)}{" "}
                tok/s)
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="16"
              step="2"
              value={cpuThreads}
              onChange={(e) => setCpuThreads(parseInt(e.target.value, 10))}
              className="w-full accent-[#4B6BF6] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400">
              <span>2 Threads (Eco)</span>
              <span>8 Threads</span>
              <span>16 Threads (Max Throughput)</span>
            </div>
          </div>

          {/* System Prompt */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-[#0B0D12]">
              System Prompt
            </label>
            <textarea
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs font-mono text-[#0B0D12] leading-relaxed focus:outline-none focus:border-[#4B6BF6]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setSettingsSavedBanner(true);
                setTimeout(() => setSettingsSavedBanner(false), 2200);
              }}
              className="px-4 py-2 rounded-xl bg-[#0B0D12] hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
            >
              Apply Inference Config
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-white text-[#0B0D12] font-sans antialiased selection:bg-[#4B6BF6]/20 selection:text-[#0B0D12]">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* --- LEFT NAVIGATION SIDEBAR (260px FIXED, #0B0D12) --- */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-[260px] shrink-0 bg-[#0B0D12] text-white flex flex-col justify-between border-r border-white/10 transition-transform duration-200 ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Section: Brand + New Chat */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <KrintIntLogo size={28} className="shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] font-medium tracking-wider uppercase text-neutral-400 leading-none">
                  KrintInt Labs
                </div>
                <div className="text-sm font-semibold text-white truncate mt-1">
                  {aiName}
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleNewChat}
            className="w-full py-2.5 px-3.5 rounded-xl bg-[#4B6BF6] hover:bg-[#3B5BE6] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Middle Section: Navigation Tabs + Chat History */}
        <div className="flex-1 overflow-y-auto px-3 space-y-5">
          {/* Primary Navigation */}
          <nav className="space-y-0.5">
            <div className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Workspace
            </div>
            {[
              { id: "chat", label: "Chat", icon: MessageSquare },
              {
                id: "models",
                label: "Models",
                icon: Cpu,
                badge: `${models.length}`,
              },
              { id: "store", label: "Model Store", icon: Store },
              { id: "documents", label: "Documents", icon: FileText },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full px-2.5 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-[#4B6BF6]" : "text-neutral-400"
                      }`}
                    />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Chat History List */}
          <div className="space-y-1">
            <div className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Recent Conversations
            </div>
            <div className="space-y-0.5">
              {chats.map((chat) => {
                const isSelected =
                  activeTab === "chat" && activeChatId === chat.id;
                return (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => {
                      setActiveChatId(chat.id);
                      setActiveTab("chat");
                      if (workspaceMode === "browser") {
                        setWorkspaceMode("chat");
                      }
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full px-2.5 py-2 rounded-lg text-left transition-colors group ${
                      isSelected
                        ? "bg-[#4B6BF6]/15 text-white border border-[#4B6BF6]/30"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="text-xs font-medium truncate">
                      {chat.title}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5">
                      {chat.timestamp}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom-Left Corner: System Monitor Card */}
        <div className="p-3 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4B6BF6] animate-pulse" />
                <span className="text-[11px] font-semibold text-white">
                  Local Runtime Active
                </span>
              </div>
              <Activity className="w-3.5 h-3.5 text-[#4B6BF6]" />
            </div>

            <div className="space-y-1 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center justify-between">
                <span>RAM</span>
                <span className="text-neutral-200">
                  {currentRamUsage} / 16 GB
                </span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4B6BF6] transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (parseFloat(currentRamUsage) / 16) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span>GPU</span>
                <span className="text-neutral-200">RTX 5060 Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Mode</span>
                <button
                  type="button"
                  onClick={() =>
                    setRuntimeMode((prev) =>
                      prev === "Hybrid" ? "Offline" : "Hybrid",
                    )
                  }
                  className="text-[#4B6BF6] hover:underline font-sans font-semibold"
                  title="Click to toggle Offline / Hybrid mode"
                >
                  {runtimeMode === "Hybrid"
                    ? "Offline / Hybrid"
                    : "Strict Offline"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN WHITE WORKSPACE --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* TOP OMNI-BAR & INTEGRATED BROWSER HEADER */}
        <header className="px-3 sm:px-5 py-2.5 border-b border-[#E5E7EB] bg-white flex items-center justify-between gap-3 flex-wrap z-20">
          {/* Left: Mobile Trigger + Mode Switcher Pill */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-[#E5E7EB] text-[#0B0D12] hover:bg-neutral-50"
              aria-label="Open sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center p-1 rounded-xl bg-neutral-100 border border-[#E5E7EB]">
              {[
                { id: "chat", label: "AI Chat", icon: MessageSquare },
                { id: "browser", label: "Web Browser", icon: Globe },
                { id: "split", label: "Split View", icon: Columns },
              ].map((mode) => {
                const Icon = mode.icon;
                const active =
                  activeTab === "chat" && workspaceMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      setActiveTab("chat");
                      setWorkspaceMode(mode.id);
                    }}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                      active
                        ? "bg-white text-[#0B0D12] shadow-2xs border border-[#E5E7EB]/80"
                        : "text-neutral-600 hover:text-[#0B0D12]"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        active ? "text-[#4B6BF6]" : "text-neutral-500"
                      }`}
                    />
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Smart URL / Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigateToUrl(urlInput);
            }}
            className="flex-1 min-w-[200px] max-w-2xl flex items-center gap-1.5"
          >
            <div className="hidden md:flex items-center gap-0.5">
              <button
                type="button"
                onClick={handleBrowserBack}
                disabled={historyIndex <= 0}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-[#0B0D12] hover:bg-neutral-100 disabled:opacity-30"
                title="Back"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleBrowserForward}
                disabled={historyIndex >= browserHistory.length - 1}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-[#0B0D12] hover:bg-neutral-100 disabled:opacity-30"
                title="Forward"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleBrowserRefresh}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-[#0B0D12] hover:bg-neutral-100"
                title="Refresh"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${isRefreshingBrowser ? "animate-spin" : ""}`}
                />
              </button>
            </div>

            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-[#FAFAFB] focus-within:bg-white focus-within:border-[#4B6BF6] transition-all">
              <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter URL (e.g., https://github.com/krintint-labs/runtime) or search..."
                className="w-full text-xs text-[#0B0D12] bg-transparent focus:outline-none font-mono"
              />
            </div>
          </form>

          {/* Right: Ask {aiName} about this page CTA */}
          <button
            type="button"
            onClick={handleAskAboutPage}
            className="px-3 py-1.5 rounded-xl bg-[#4B6BF6] hover:bg-[#3B5BE6] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 shadow-2xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask {aiName} about this page</span>
          </button>
        </header>

        {/* WORKSPACE CONTENT ROUTER */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {activeTab === "chat" && (
            <>
              {workspaceMode === "chat" && (
                <div className="flex-1 min-w-0 h-full">
                  {renderChatWorkspace(false)}
                </div>
              )}

              {workspaceMode === "browser" && (
                <div className="flex-1 min-w-0 h-full">
                  {renderBrowserViewport()}
                </div>
              )}

              {workspaceMode === "split" && (
                <div className="flex-1 flex flex-col lg:flex-row min-w-0 h-full">
                  {/* Left 55%: Integrated Browser */}
                  <div className="w-full lg:w-[55%] h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-[#E5E7EB] min-w-0">
                    {renderBrowserViewport()}
                  </div>
                  {/* Right 45%: Active AI Chat */}
                  <div className="w-full lg:w-[45%] h-1/2 lg:h-full min-w-0">
                    {renderChatWorkspace(true)}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "models" && renderModelsView()}
          {activeTab === "store" && renderModelStoreView()}
          {activeTab === "documents" && renderDocumentsView()}
          {activeTab === "settings" && renderSettingsView()}
        </div>
      </main>
    </div>
  );
}
