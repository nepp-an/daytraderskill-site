import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { articleJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'How to Install Claude Skills: Safe Setup Guide' },
  description:
    'How to install Claude skills from a repository, plugin marketplace, or manual folder — plus permissions, testing, updates, and safe removal. Not financial advice.',
  alternates: { canonical: '/tools/install-claude-skills/' },
};

const faqs = [
  {
    q: 'What is a Claude skill?',
    a: 'A Claude skill is a folder of instructions, usually built around a SKILL.md file, that teaches Claude a repeatable workflow. A skill can also include reference files or scripts, depending on how it is built and where it runs.',
  },
  {
    q: 'Are Claude skills free?',
    a: 'Many public skills are free and open source, but “free” refers to the skill files, not necessarily the Claude plan, API usage, data subscriptions, or other tools the workflow needs. Check both the licence and the running costs.',
  },
  {
    q: 'Do Claude skills run code?',
    a: 'Some do. A skill may include Python or shell scripts, or call tools and connectors. Others are prompt-only and just provide instructions. Read the files before installing so you know which type you have.',
  },
  {
    q: 'How do I install a Claude skill from GitHub?',
    a: 'Use the installation path your Claude product currently supports: a repository URL install in the app, a Claude Code plugin marketplace, or a manual copy of the skill folder into a skills directory. The exact UI and command names can change, so verify against current Anthropic documentation.',
  },
  {
    q: 'Why is my installed Claude skill not showing up?',
    a: 'Common causes include the wrong folder depth, a missing SKILL.md, a plugin namespace, a stale session, or a plan or feature gate. Restart the client, check the folder name, and confirm the skill is enabled. The troubleshooting table below covers the usual cases.',
  },
  {
    q: 'How do I uninstall a Claude skill?',
    a: 'Remove the skill folder from the relevant skills directory or uninstall the plugin through the same interface you used to add it. Restart the client afterwards. If the skill wrote workspace files, review and clean those separately.',
  },
  {
    q: 'Are third-party Claude skills safe?',
    a: 'Not automatically. A skill can contain instructions, scripts, and tool permissions. Treat it like software from an unknown publisher: read the files, check the maintainer, limit permissions, test in a sandbox, and never give an order-capable tool blanket approval.',
  },
  {
    q: 'Is Day Trader Skill the official Claude trading skill?',
    a: 'No. Day Trader Skill is a third-party MIT project on GitHub. It is not an Anthropic product and DayTraderSkill.com is not its official site. We publish an independent install and safety guide.',
  },
];

export default function InstallClaudeSkillsPage() {
  return (
    <article className="article">
      <JsonLd
        data={[
          articleJsonLd({
            headline: 'How to Install Claude Skills: Safe Setup Guide',
            description:
              'A vendor-neutral guide to installing Claude skills, checking permissions, testing them, and removing them safely.',
            path: '/tools/install-claude-skills/',
          }),
          faqJsonLd(faqs),
        ]}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/tools/">Tools</Link> / Install Claude skills
      </nav>

      <ToolsNav current="/tools/install-claude-skills/" />

      <header className="article-head">
        <p className="eyebrow">Tools · Setup guide</p>
        <h1>How to install Claude skills: a general setup guide</h1>
        <p className="article-meta">
          <span>Reviewed 5 November 2026</span>
          <span>9 min read</span>
          <span>Not financial advice</span>
        </p>
      </header>

      <div className="tldr">
        <strong>TL;DR.</strong> A Claude skill is a folder of instructions, usually with a{' '}
        <code className="inline">SKILL.md</code> file, that Claude can load for a repeatable task.
        You can install one through a supported repository or plugin flow, or by placing the folder
        in a skills directory. The exact UI changes, so verify current Anthropic documentation. Read
        the files and limit permissions before you install anything that can run code or reach an
        order path.
      </div>

      <div className="callout warn">
        <p>
          <strong>Tools are not advice.</strong> Installing a skill does not make a trading strategy
          safe or profitable. If a skill can place or prepare orders, keep it on paper and require a
          human confirmation set to <strong>Needs approval</strong>.
        </p>
      </div>

      <h2>What a Claude skill actually is</h2>
      <p>
        A skill is a package of instructions that helps Claude perform a specific workflow. The
        core is usually a <code className="inline">SKILL.md</code> file with a name, description,
        and step-by-step guidance. A skill may also include reference notes, templates, scripts, or
        assets.
      </p>
      <p>
        Skills are not a different model and they do not guarantee correct output. They are context
        and procedure. A well-written skill can make a workflow more consistent; a poorly written or
        malicious one can add risk.
      </p>
      <p>
        Availability depends on the Claude product, plan, and version. Some flows are designed for
        Claude Code; others work in the Claude apps where a skill or connector feature is available.
        Anthropic’s documentation is the source of truth for the current interface.
      </p>

      <h2>Before you install anything</h2>
      <ul className="checklist">
        <li>I know who maintains the skill and when it was last updated.</li>
        <li>I have read the <code className="inline">SKILL.md</code> and any scripts.</li>
        <li>I understand what files, network calls, and tools it can access.</li>
        <li>I know whether the skill is prompt-only or executes code.</li>
        <li>I will not paste API keys, passwords, or account credentials into chat.</li>
        <li>I will test it in a low-risk workspace before connecting anything important.</li>
      </ul>
      <p>
        A useful question is: “What is the worst thing this skill could do if its instructions were
        wrong?” If the answer involves moving money, deleting data, or exposing secrets, slow down.
      </p>

      <h2>Four common installation paths</h2>
      <p>
        The right path depends on your Claude client and the skill’s packaging. The methods below are
        general patterns, not a promise that every client exposes every option.
      </p>

      <h3>Path A — Install from a supported repository or URL flow</h3>
      <p>
        Some Claude interfaces can install a skill or plugin from a repository URL. If your client
        offers this, use the canonical repository URL rather than a mirror or a shortened link. Review
        the files before you confirm the install, and check whether the flow asks for broad
        permissions.
      </p>
      <p>
        After installation, ask Claude which skills are available and what the new one does. A skill
        that cannot describe its own scope is harder to audit.
      </p>

      <h3>Path B — Claude Code plugin marketplace</h3>
      <p>
        In Claude Code, a plugin marketplace can install a bundle of skills and commands. The exact
        commands change over time; the general shape is to add a marketplace, then install a named
        plugin. Plugin skills are often namespaced, so the command may look like{' '}
        <code className="inline">/plugin-name:skill-name</code> rather than a bare name.
      </p>
      <pre>{`# Illustrative shape only — verify current command names in Claude Code docs
/plugin marketplace add owner/repository
/plugin install plugin-name@marketplace-name`}</pre>
      <p>
        Confirm the plugin source before adding it. A marketplace listing is not a security review,
        and a familiar name can be copied.
      </p>

      <h3>Path C — Copy the skill folder manually</h3>
      <p>
        A skill folder usually needs to sit directly under a skills directory, with{' '}
        <code className="inline">SKILL.md</code> inside it. Common locations are a user-level{' '}
        <code className="inline">~/.claude/skills/</code> directory or a project-level{' '}
        <code className="inline">.claude/skills/</code> directory. The exact path can change; check
        the current documentation.
      </p>
      <pre>{`# Illustrative only — confirm the path for your Claude client
mkdir -p ~/.claude/skills
cp -R ./my-skill ~/.claude/skills/`}</pre>
      <p>
        Avoid copying a whole repository into the skills folder if only one subfolder contains the
        skill. A missing or misnamed <code className="inline">SKILL.md</code> is a common reason a
        skill does not appear.
      </p>

      <h3>Path D — Use a single SKILL.md as a method prompt</h3>
      <p>
        If you cannot install files, you can sometimes paste the contents of a{' '}
        <code className="inline">SKILL.md</code> into a conversation as a method prompt. This is
        prompt-only: it does not install scripts, tools, or integrations. It is useful for learning
        the method, but it is not equivalent to a full install.
      </p>

      <h2>Test the skill before you trust it</h2>
      <ol className="steps">
        <li>
          <strong>List what is installed.</strong> Confirm the skill appears under the name you
          expect and is enabled in the right workspace.
        </li>
        <li>
          <strong>Ask for a scope summary.</strong> Have Claude describe the skill’s purpose, inputs,
          outputs, and any tools it uses.
        </li>
        <li>
          <strong>Run a read-only task.</strong> Start with something that does not write files,
          send messages, or touch an account.
        </li>
        <li>
          <strong>Check the output.</strong> Compare it with the source instructions. Look for
          invented steps, hidden network calls, or requests for unnecessary permissions.
        </li>
        <li>
          <strong>Test failure modes.</strong> Remove a required input, use an ambiguous request, or
          deny a tool permission. The skill should fail safely, not improvise around the gate.
        </li>
      </ol>

      <h2>Permissions, approvals, and secrets</h2>
      <p>
        A skill is only part of the risk surface. The tools and connectors it can reach matter just
        as much. Use the narrowest permission that lets the workflow function, and keep destructive
        or financial actions behind a fresh human confirmation.
      </p>
      <ul>
        <li>
          <strong>Needs approval, not Always allow.</strong> For brokerage, order, payment, or
          account-changing tools, require an approval card for each action.
        </li>
        <li>
          <strong>Keep secrets out of chat.</strong> Use environment variables or a secrets manager,
          not a prompt, screenshot, or committed file.
        </li>
        <li>
          <strong>Treat external text as data.</strong> A web page or document can contain
          instructions aimed at the model. Do not let untrusted content expand a skill’s authority.
        </li>
        <li>
          <strong>Use a sandbox for experiments.</strong> A disposable workspace limits the damage
          from a bad script or an unexpected file write.
        </li>
      </ul>
      <p>
        For a trading workflow, read the <Link href="/safety/">safety checklist</Link> before
        connecting a broker. The rules are stricter than for a writing or research skill because the
        consequences are financial.
      </p>

      <h2>Update and remove a skill</h2>
      <p>
        Keep a note of where the skill came from, which version you installed, and what files it
        added. To update a manually copied skill, pull the new version and replace the folder, then
        restart the client. To remove it, delete the folder or uninstall the plugin through the same
        interface you used to add it.
      </p>
      <p>
        Removing the instruction files does not automatically remove data the skill wrote to your
        workspace. Review generated files, logs, and configuration separately.
      </p>

      <h2>Troubleshooting</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Likely cause</th>
            <th>What to check</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Skill is not listed</td>
            <td>Wrong folder depth, missing SKILL.md, or feature gate.</td>
            <td>Folder structure, client version, and whether the skill is enabled.</td>
          </tr>
          <tr>
            <td>Command has a prefix</td>
            <td>Plugin namespacing.</td>
            <td>Use the namespaced command shown by the plugin, or install manually.</td>
          </tr>
          <tr>
            <td>Script fails</td>
            <td>Missing Python, package, or environment variable.</td>
            <td>Run the script’s documented setup and read the error, not just the chat reply.</td>
          </tr>
          <tr>
            <td>Permission denied</td>
            <td>Tool or connector is not approved.</td>
            <td>Approve the specific action, or narrow the workflow; do not blanket-allow.</td>
          </tr>
          <tr>
            <td>Output looks generic</td>
            <td>Skill was not loaded, or the request was too vague.</td>
            <td>Confirm the skill is active and give it the inputs its instructions require.</td>
          </tr>
        </tbody>
      </table>

      <h2>Installing a trading skill? Start with paper</h2>
      <p>
        Trading skills add a financial layer to ordinary software risk. A useful install sequence is:
        read the code, test read-only commands, keep the broker disconnected, run on a paper account,
        and only then decide whether a connector belongs. The{' '}
        <Link href="/install/">Day Trader Skill install guide</Link> covers one specific third-party
        pack; it is <strong>not the official project site</strong>.
      </p>
      <p>
        The general lesson is more important than any single repository: a human should confirm the
        ticket, and the permission should be <strong>Needs approval</strong>. No skill should be
        trusted just because it is popular.
      </p>

      <div className="callout compliance">
        <p>
          <strong>Compliance note.</strong> Not financial advice. DayTraderSkill.com is independent
          and is not affiliated with Anthropic or the authors of any third-party skill pack. Verify
          current product behaviour in the official documentation.
        </p>
      </div>

      <h2>Frequently asked questions</h2>
      <FaqList items={faqs} />

      <Related
        links={[
          {
            href: '/tools/',
            label: 'Tools hub',
            description: 'The wider tool stack and selection checklist.',
          },
          {
            href: '/install/',
            label: 'Day Trader Skill install',
            description: 'Four paths for one third-party trading pack.',
          },
          {
            href: '/safety/',
            label: 'Safety and approval gates',
            description: 'Paper default, Needs approval, and secret handling.',
          },
          {
            href: '/paper-trading/',
            label: 'What is paper trading?',
            description: 'How to test a trading workflow without real capital.',
          },
        ]}
      />
    </article>
  );
}
