---
title: "Pineapple AI Browser - Voice Pipeline Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - voice
  - audio
  - transcription
aliases:
  - "Voice Pipeline"
  - "Botless Audio Capture"
links:
  - "[[Home]]"
  - "[[Vision & Roadmap]]"
  - "[[Memory System]]"
confidence: "high"
---

# Voice Pipeline & Botless Audio Transcription

## Overview

The Voice Pipeline specification (Phase 6 Roadmap) defines Pineapple's native, botless system loopback audio recorder. Rather than sending virtual bot joiners into video meetings (Zoom, Google Meet, Teams), Pineapple captures desktop system audio output natively (macOS CoreAudio / Windows WASAPI) and transcribes speech locally using `whisper.cpp`.

---

## Architecture & Components

- **Audio Loopback DSP:** Native desktop loopback audio capture driver interfacing directly with CoreAudio (macOS) or WASAPI (Windows).
- **Local Speech-to-Text Engine:** `whisper.cpp` (C++ port of OpenAI Whisper) running on local hardware (Apple Silicon Metal / NPU hardware acceleration).
- **Real-Time Call Summarizer:** Streaming text segment analyzer extracting key decisions, action items, and meeting notes in real time.

---

## Flow Diagram

```text
Video Call in Browser (Google Meet / Zoom / Teams)
                        │
                        ▼
    System Audio Output (CoreAudio / WASAPI)
                        │
                        ▼
   Native Desktop Audio Loopback DSP Buffer
                        │
                        ▼
      Local whisper.cpp STT Pipeline
                        │
                        ▼
    Real-Time Transcript & Note Generation
                        │
                        ▼
   Saved locally into Encrypted Vector Store
```

---

## Configuration

- **Target Audio Format:** 16kHz PCM mono audio buffer
- **Local Model Default:** `whisper-base.en` (39M parameters) for <10% CPU usage
- **Fallback API:** Optional OpenAI Whisper API (`/v1/audio/transcriptions`) for low-spec hardware

---

## Known Issues

1. **Platform Audio Permissions:** macOS requires explicit Screen & System Audio Recording permission in System Settings.
2. **GPU Memory Footprint:** Running large Whisper models concurrently with LLM inference requires 8GB+ unified memory on Apple Silicon.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Vision & Roadmap]] — Phased Execution Roadmap
- [[Memory System]] — Vector Memory Store
