import re
from fastapi import HTTPException

class GuardrailService:
    def __init__(self):
        # Configuration (can be moved to settings later)
        self.MAX_LENGTH = 1000
        self.ALLOW_LIST = [] # Optional: Populate if needed
        self.DENY_PATTERNS = [
            # 1. Direct Injection
            r"ignore previous instructions",
            r"system prompt",
            r"ignore the above",
            r"DAN mode",
            r"jailbreak",
            
            # 2. Refusal Suppression
            r"never refuse",
            r"do not apologize",
            r"do not say no",
            
            # 3. Privilege Escalation / Persona
            r"developer mode",
            r"unrestricted",
            r"god mode",
            r"sudo",
            
            # 4. Persona (Unrestricted) -> Allowed by user request
            # r"Mongo Tom",
            # r"AIM mode",

            # 5. Encoding Attacks (Basic check for intent)
            r"decode",
            r"base64",
            r"hex string",
        ]

    async def check_injection(self, message: str):
        """
        Orchestrates various security checks.
        """
        self.check_length(message)
        self.check_allowlist(message)
        self.check_special_chars(message)
        self.detect_injection_patterns(message)

    def check_length(self, message: str):
        if len(message) > self.MAX_LENGTH:
            raise HTTPException(status_code=400, detail="Message exceeds maximum length limit.")

    def check_allowlist(self, message: str):
        if self.ALLOW_LIST and message not in self.ALLOW_LIST:
             raise HTTPException(status_code=403, detail="Message rejected by allow-list policy.")
        pass

    def check_special_chars(self, message: str):
        dangerous_chars = [r"\|\|", r"&&", r"\$\("] # Bash operators
        for pattern in dangerous_chars:
            if re.search(pattern, message):
                raise HTTPException(status_code=403, detail="Message contains forbidden special characters.")

    def detect_injection_patterns(self, message: str):
        for pattern in self.DENY_PATTERNS:
            if re.search(pattern, message, re.IGNORECASE):
                raise HTTPException(status_code=403, detail="Potential prompt injection detected.")

    def format_with_delimiters(self, message: str) -> str:
        sanitized = message.replace('"""', "'''")
        return f'"""\n{sanitized}\n"""'

    async def self_examination(self, response: str):
        pass

guardrail_service = GuardrailService()
