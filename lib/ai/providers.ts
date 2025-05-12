import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { openRouter, DEFAULT_MODEL } from './openrouter';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openRouter(DEFAULT_MODEL),
        'chat-model-reasoning': wrapLanguageModel({
          model: openRouter(DEFAULT_MODEL),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openRouter(DEFAULT_MODEL),
        'artifact-model': openRouter(DEFAULT_MODEL),
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
