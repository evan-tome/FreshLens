import { generateRecipes, parseRecipeText } from './recipeGenerator.js';

global.testIngredients = global.testIngredients || ["apple", "banana"];
global.testDietaryRestrictions = global.testDietaryRestrictions || ["gluten-free"];

describe('generateRecipes', () => {
    jest.setTimeout(30000); // Timeout for API calls

    it('should generate a recipe from the Hugging Face API', async () => {
        const recipeText = await generateRecipes(testIngredients, testDietaryRestrictions);

        expect(recipeText).not.toBeNull();
        expect(typeof recipeText).toBe("string");
        expect(recipeText).toContain("Recipe Name");
        expect(recipeText).toContain("Description");
        expect(recipeText).toContain("Ingredients");
        expect(recipeText).toContain("Instructions");

        console.log("Generated Recipe Text:", recipeText);
    });

    it('should handle invalid ingredients gracefully', async () => {
        const invalidIngredients = ["invalid"];
        const invalidRestrictions = ["nonexistent"];

        const recipeText = await generateRecipes(invalidIngredients, invalidRestrictions);

        // Our simulation returns text even for "invalid" ingredients
        expect(recipeText).toContain("Recipe Name");
        expect(recipeText).toContain("Description");
    });

    it('should parse recipe text correctly', () => {
        const sampleText = `
        Recipe Name: Apple Banana Delight
        Description: A delightful recipe using apple and banana
        Ingredients: apple, banana, honey, cinnamon
        Instructions: Mix ingredients, Bake for 20 minutes
        `;
        const parsedText = parseRecipeText(sampleText);

        expect(parsedText).toContain("Recipe Name");
        expect(parsedText).toContain("Ingredients");
        expect(parsedText).toContain("Instructions");
    });

    it('should fail gracefully if recipe structure is invalid', () => {
        const invalidText = "This is not a valid recipe format";
        const parsedText = parseRecipeText(invalidText);

        expect(parsedText).toBe("This is not a valid recipe format");
    });
});
