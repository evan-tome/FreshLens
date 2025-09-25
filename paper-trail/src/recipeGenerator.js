import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.REACT_APP_HF_TOKEN);

/**
 * Generate recipe text using Hugging Face Gemma model
 * @param {string[]} ingredients - List of ingredients
 * @param {string[]} dietaryRestrictions - List of dietary restrictions
 * @param {string} customPrompt - Optional custom prompt
 * @returns {string} Generated recipe text
 */
async function generateRecipeText(ingredients, dietaryRestrictions = [], customPrompt = "") {
  const prompt = customPrompt?.trim() || generateDefaultPrompt(ingredients, dietaryRestrictions);

  console.log("Prompt being sent to API:", prompt);

  // Simulated environment for testing
  if (process.env.NODE_ENV === "test") {
    return simulateApiResponse(ingredients);
  }

  try {
    const chatCompletion = await client.chatCompletion({
      provider: "nebius",
      model: "google/gemma-2-2b-it",  // Model to use
      messages: [
        { role: "user", content: prompt },
      ],
    });

    const recipeText = chatCompletion.choices[0].message.content?.trim();
    console.log("Generated recipe text:", recipeText);

    return parseRecipeText(recipeText);
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
}

function generateDefaultPrompt(ingredients, dietaryRestrictions) {
  let prompt = `Generate a healthy and tasty recipe in the following text format:
    Recipe Name: Recipe Name
    Description: A short description
    Calories: Calorie count
    Ingredients: ingredient 1, ingredient 2, ingredient 3
    Instructions: step 1, step 2, step 3
    Using some or all of the following ingredients: ${ingredients.join(", ")}.`;

  if (dietaryRestrictions.length > 0) { // TODO: allow user to implement dietary restrictions
    prompt += ` Consider these dietary restrictions: ${dietaryRestrictions.join(", ")}.`;
  }

  return prompt;
}

function simulateApiResponse(ingredients) {
  if (ingredients.includes("invalid")) {
    return `Recipe Name: Recipe Name
      Description: A short description
      Ingredients: ingredient 1, ingredient 2
      Instructions: step 1, step 2`;
  }

  return `Recipe Name: Apple Banana Delight
    Description: A delightful recipe using apple and banana
    Ingredients: apple, banana, honey, cinnamon
    Instructions: Mix ingredients, Bake for 20 minutes`;
}

async function generateRecipes(ingredients, dietaryRestrictions) {
  if (!process.env.REACT_APP_HF_TOKEN) {
    throw new Error("HF_TOKEN environment variable is missing.");
  }

  try {
    const recipeText = await generateRecipeText(ingredients, dietaryRestrictions);
    return recipeText || null;
  } catch (error) {
    console.error("Error in generateRecipes:", error);
    return null;
  }
}

function parseRecipeText(recipeText) {
  try {
    const cleanedText = recipeText.trim();
    return cleanedText;
  } catch (error) {
    console.error("Error parsing recipe text:", error);
    return "Error: Unable to parse recipe text.";
  }
}

export { generateRecipes, generateRecipeText, parseRecipeText };
