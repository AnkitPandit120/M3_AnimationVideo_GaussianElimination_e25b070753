# Gaussian Elimination · Recorded Narration

Ankit · e25b070753

**0:04 · The canteen puzzle**

You are in the college canteen. Three friends order, and nobody remembers the prices. Bill one: one chai, one samosa and one maggi, forty-five rupees.

**0:19 · The canteen puzzle**

Bill two: two chai, three samosa, one maggi, eighty-five.

**0:24 · The canteen puzzle**

Bill three: one chai, two samosa, three maggi, one hundred. Can you find the price of each item?

**0:32 · The canteen puzzle**

You could guess and check, but what if there were ten items, or a thousand? Engineers solve systems with thousands of unknowns every day, and they use one method: Gaussian elimination. Let's see how it works, and more importantly, why it works.

**0:51 · From bills to a matrix**

Let chai be x, samosa y, and maggi z. Our bills become three equations.

**0:58 · From bills to a matrix**

Writing x, y, z every time is wasteful, so we pack the numbers into an augmented matrix. Each row is one equation. The first three columns are the coefficients, and the last column, after the bar, is the right-hand side.

**1:16 · From bills to a matrix**

Gaussian elimination has one goal: use row operations to turn this into a staircase shape, called row-echelon form, where the bottom row has only one unknown. Then we solve from the bottom up.

**1:31 · From bills to a matrix**

We are only allowed three operations: swap two rows, multiply a row by a nonzero number, or add a multiple of one row to another.

**1:42 · Why elimination works**

Here is the picture. Each equation is a plane in three-dimensional space. A solution must lie on all three planes at once, so the solution is where they meet. Here, that's a single point.

**1:58 · Why elimination works**

Now what does a row operation do? Replacing an equation with 'itself minus twice another' gives us a new plane, tilted differently. The meeting point hasn't moved.

**2:20 · Why elimination works**

Every point that satisfied both old equations satisfies the new one, and the operation is reversible, so we can always undo it. That's the key reason row operations preserve the solution set.

**2:36 · Why elimination works**

So elimination is just tilting planes, one at a time, until the system is so simple we can read off the answer.

**2:46 · Forward elimination**

Our matrix is this. Step one. The pivot is the one in the top-left. We use it to clear the column below it.

**2:55 · Forward elimination**

Row two becomes row two minus two times row one: two, three, one, eighty-five, minus two, two, two, ninety, gives zero, one, minus one, minus five.

**3:09 · Forward elimination**

Row three becomes row three minus row one: one, two, three, one hundred, minus one, one, one, forty-five, gives zero, one, two, fifty-five.

**3:21 · Forward elimination**

Step two. The next pivot is the one in row two, column two. Clear below it.

**3:28 · Forward elimination**

Row three becomes row three minus row two: zero, one, two, fifty-five, minus zero, one, minus one, minus five, gives zero, zero, three, sixty. Now we have a staircase.

**3:44 · Back-substitution and check**

The last row says three z equals sixty, so z equals twenty.

**3:50 · Back-substitution and check**

Back-substitution. Row two says y minus z equals minus five, so y equals minus five plus twenty, which is fifteen.

**3:59 · Back-substitution and check**

Row one says x plus y plus z equals forty-five, so x equals forty-five minus fifteen minus twenty, which is ten.

**4:09 · Back-substitution and check**

Chai is ten rupees, samosa fifteen, maggi twenty.

**4:13 · Back-substitution and check**

Always check: ten plus fifteen plus twenty is forty-five. Twenty plus forty-five plus twenty is eighty-five. Ten plus thirty plus sixty is one hundred. All three bills match.

**4:26 · Interpretation, recap and credits**

Let's connect this back to geometry. Three pivots, one in each column, means three planes crossing at exactly one point: a unique solution.

**4:36 · Interpretation, recap and credits**

But elimination also tells us when something goes wrong. If we ever get a row like zero, zero, zero, five, that says zero equals five. Impossible, so the planes never meet at a common point and there's no solution.

**4:51 · Interpretation, recap and credits**

If we end with a row of all zeros, we've lost an equation, one variable is free, and there are infinitely many solutions.

**5:01 · Interpretation, recap and credits**

And if a pivot position happens to hold a zero? Just swap rows. That's why swapping is allowed.

**5:08 · Interpretation, recap and credits**

Three things to remember. One: a system of equations can be written as an augmented matrix. Two: row operations are reversible, so they never change the solution. Geometrically, they tilt the planes but keep their meeting point fixed. Three: eliminate downwards to get a staircase, then back-substitute upwards. Thanks for watching.
